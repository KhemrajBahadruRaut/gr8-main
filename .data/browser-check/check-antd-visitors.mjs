import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const directory = resolve('.data/browser-check');
let output = '';
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3108', '--hostname', '127.0.0.1'], {
  cwd: process.cwd(), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
});
app.stdout.on('data', part => { output += part; });
app.stderr.on('data', part => { output += part; });
const categories = ['web-development', 'digital-marketing', 'virtual-assistance'];
const visitors = Array.from({ length: 30 }, (_, index) => ({
  id: String(index + 1), name: `Visitor ${String(index + 1).padStart(2, '0')}`,
  email: `visitor${String(index + 1).padStart(2, '0')}@example.com`, visit_count: index + 1,
  categories: [categories[index % 3]], verified_at: new Date(2026, 0, index + 1).toISOString(),
  last_visited_at: index ? new Date(2026, 1, index + 1).toISOString() : null,
}));
let browser;
let failRequest = false;
const errors = [];
try {
  let ready = false;
  for (let index = 0; index < 60; index++) {
    try { if ((await fetch('http://localhost:3108/admin/')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, output.slice(-4000));
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  await context.addInitScript(() => localStorage.setItem('admin_active_section', 'project-visitors'));
  await context.route('**/auth/check.php', route => route.fulfill({ json: { status: 'ok' } }));
  await context.route('**/applications/get_applications.php', route => route.fulfill({ json: { success: true, applications: [], unread_count: 0 } }));
  await context.route('**/project-visitors/get_visitors.php', async route => {
    await new Promise(resolve => setTimeout(resolve, 150));
    return route.fulfill({ status: failRequest ? 503 : 200,
      json: failRequest ? { success: false, message: 'Test service unavailable. Please retry.' } : { success: true, visitors } });
  });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3108/admin/');
  const screen = page.getByRole('region', { name: 'Project visitors', exact: true });
  await screen.getByText('Visitor 01', { exact: true }).waitFor();
  assert.equal(await screen.locator('.ant-table').count(), 1);
  assert.equal(await screen.locator('.ant-table-tbody > .ant-table-row').count(), 20);
  await screen.locator('.ant-pagination-next button').click();
  await screen.getByText('Visitor 21', { exact: true }).waitFor();
  assert.equal(await screen.locator('.ant-table-tbody > .ant-table-row').count(), 10);

  const search = screen.getByRole('textbox', { name: 'Search by name or email' });
  await search.fill('visitor01@example.com');
  await screen.getByText('Visitor 01', { exact: true }).waitFor();
  assert.equal(await screen.locator('.ant-table-tbody > .ant-table-row').count(), 1);
  await search.fill('nothing matches');
  await screen.getByText('No visitors match these filters', { exact: true }).waitFor();
  assert.ok(await screen.getByRole('button', { name: 'Export CSV' }).isDisabled());
  await search.fill('');

  await screen.getByRole('combobox', { name: 'Filter by project category' }).click();
  await page.locator('.ant-select-dropdown').getByText('Web Development', { exact: true }).click();
  assert.equal(await screen.locator('.ant-table-tbody > .ant-table-row').count(), 10);
  assert.equal(await screen.getByText('Visitor 02', { exact: true }).count(), 0);
  const downloadEvent = page.waitForEvent('download');
  await screen.getByRole('button', { name: 'Export CSV' }).click();
  const download = await downloadEvent;
  const csv = readFileSync(await download.path(), 'utf8');
  assert.equal(csv.trim().split('\r\n').length, 11);
  assert.ok(csv.includes('visitor01@example.com'));
  assert.ok(!csv.includes('visitor02@example.com'));
  await screen.getByRole('columnheader', { name: /Visits/ }).click();
  assert.match(await screen.locator('.ant-table-tbody > .ant-table-row').first().textContent(), /Visitor 01/);
  await screen.getByRole('columnheader', { name: /Visits/ }).click();
  assert.match(await screen.locator('.ant-table-tbody > .ant-table-row').first().textContent(), /Visitor 28/);
  await page.screenshot({ path: resolve(directory, 'antd-visitors-desktop.png') });

  failRequest = true;
  await screen.getByRole('button', { name: 'Refresh' }).click();
  await screen.getByText('Test service unavailable. Please retry.', { exact: true }).waitFor();
  failRequest = false;
  await screen.getByRole('button', { name: 'Retry' }).click();
  await screen.getByText('Visitor 01', { exact: true }).waitFor();
  await page.waitForFunction(() => !document.querySelector('[aria-label="Project visitors"] .ant-btn-loading'));
  await screen.locator('.ant-skeleton').waitFor({ state: 'hidden' });

  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  assert.ok(await screen.locator('.ant-table-content').evaluate(element => element.scrollWidth > element.clientWidth));
  await page.screenshot({ path: resolve(directory, 'antd-visitors-mobile.png') });
  // Isolate this screen from the existing fixed admin navigation for visual review.
  await page.addStyleTag({ content: 'aside { visibility: hidden !important; }' });
  await page.screenshot({ path: resolve(directory, 'antd-visitors-mobile-content.png') });
  assert.deepEqual(errors, [], `Browser errors: ${errors.join('; ')}`);
  console.log('Ant Design browser checks passed: native components, pagination, search reset, empty state, category filters, filtered CSV, visit sorting, refresh errors/retry, and responsive table scrolling. PHP responses were mocked.');
} finally {
  if (browser) await browser.close();
  app.kill();
  writeFileSync(resolve(directory, 'antd-server.log'), output);
}
