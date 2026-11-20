import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { writeFileSync } from 'node:fs';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const directory = resolve('.data/browser-check');
let output = '';
const app = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '--port', '3108', '--hostname', '127.0.0.1'], {
  cwd: process.cwd(), windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'],
});
app.stdout.on('data', part => { output += part; });
app.stderr.on('data', part => { output += part; });
const fixture = { home: { title: 'Our Works', panels: [
  { title: 'Digital Marketing' }, { title: 'Web Development' }, { title: 'Virtual Assistance' }
] }, web_development: { title: 'Verified web development projects', projects: [] },
digital_marketing: { title: 'Verified digital marketing projects', clients: [] },
virtual_assistance: { title: 'Verified virtual assistance projects', clients: [] } };
let browser;
try {
  let ready = false;
  for (let index = 0; index < 60; index++) {
    try { if ((await fetch('http://localhost:3108/projects/')).ok) { ready = true; break; } } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  assert.ok(ready, output.slice(-4000));
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, acceptDownloads: true });
  let verified = false;
  const visits = new Set();
  const errors = [];
  const visitor = { id: 'test', name: 'Browser Test Visitor', email: 'visitor@example.com',
    verified_at: new Date().toISOString(), last_visited_at: new Date().toISOString(), visit_count: 1, categories: ['web-development'] };
  await context.route('**/project-visitors/*.php', async route => {
    const path = new URL(route.request().url()).pathname;
    if (path.endsWith('/get_session.php')) return route.fulfill({ json: { success: true, verified } });
    if (path.endsWith('/request_code.php')) {
      const details = route.request().postDataJSON();
      assert.equal(details.name, visitor.name);
      assert.equal(details.email, visitor.email);
      assert.equal(details.category, 'web-development');
      return route.fulfill({ json: { success: true, email: visitor.email, retry_after: 60 } });
    }
    if (path.endsWith('/verify.php')) {
      const correct = route.request().postDataJSON().code === '123456';
      verified = correct;
      return route.fulfill({ status: correct ? 200 : 400, json: correct ? { success: true } : { success: false, message: 'That code is incorrect. Check your email and try again.' } });
    }
    if (path.endsWith('/record_visit.php')) {
      assert.ok(verified);
      visits.add(route.request().postDataJSON().visit_id);
      return route.fulfill({ json: { success: true } });
    }
    return route.fulfill({ json: { success: true, visitors: [visitor] } });
  });
  await context.route('**/works/get_works.php*', route => route.fulfill({ json: { success: true, content: fixture } }));
  await context.route('**/auth/check.php', route => route.fulfill({ json: { status: 'ok' } }));
  await context.route('**/applications/get_applications.php', route => route.fulfill({ json: { success: true, applications: [], unread_count: 0 } }));
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('http://localhost:3108/projects/');
  await page.locator('a[href="/projects/web-development/"]').click();
  await page.getByRole('dialog').waitFor();
  assert.equal(new URL(page.url()).pathname, '/projects/');
  await page.getByLabel('Full name').fill(visitor.name);
  await page.getByLabel('Email address').fill(visitor.email);
  await page.screenshot({ path: resolve(directory, 'php-verification-desktop.png') });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.ok(await page.getByRole('dialog').evaluate(element => element.getBoundingClientRect().width <= innerWidth));
  await page.screenshot({ path: resolve(directory, 'php-verification-mobile.png') });
  await page.getByRole('button', { name: 'Send verification code' }).click();
  await page.getByLabel('Verification code').waitFor();
  await page.getByLabel('Verification code').fill('000000');
  await page.getByRole('button', { name: 'Verify & view projects' }).click();
  await page.getByRole('dialog').getByRole('alert').waitFor();
  assert.match(await page.getByRole('dialog').getByRole('alert').textContent(), /incorrect/);
  await page.getByLabel('Verification code').fill('123456');
  await page.getByRole('button', { name: 'Verify & view projects' }).click();
  await page.waitForURL('**/projects/web-development/');
  await page.getByRole('heading', { name: 'Verified web development projects' }).waitFor();
  assert.equal(visits.size, 1);

  const anonymous = await browser.newContext();
  const direct = await anonymous.newPage();
  await direct.goto('http://localhost:3108/projects/digital-marketing/');
  await direct.getByRole('dialog').waitFor();
  assert.equal(await direct.getByRole('heading', { name: 'Verified digital marketing projects' }).count(), 0);
  await anonymous.close();

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.evaluate(() => localStorage.setItem('admin_active_section', 'project-visitors'));
  await page.goto('http://localhost:3108/admin/');
  await page.getByText(visitor.name, { exact: true }).waitFor();
  assert.equal(await page.getByRole('link', { name: visitor.email }).count(), 1);
  await page.screenshot({ path: resolve(directory, 'php-visitors-admin.png') });
  await page.getByRole('textbox', { name: 'Search by name or email' }).fill('no match');
  await page.getByText('No visitors match these filters', { exact: true }).waitFor();
  await page.getByRole('textbox', { name: 'Search by name or email' }).fill(visitor.email);
  const download = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export CSV' }).click();
  assert.equal((await download).suggestedFilename(), 'project-visitors.csv');
  assert.deepEqual(errors, [], `Browser errors: ${errors.join('; ')}`);
  console.log('Browser checks passed: PHP endpoint wiring, card modal, desktop/mobile form, code rejection, verified navigation, protected direct links, visitor tracking, admin list, search and CSV export. API success responses were mocked; live PHP endpoint checks are separate.');
} finally {
  if (browser) await browser.close();
  app.kill();
  writeFileSync(resolve(directory, 'php-frontend-server.log'), output);
}
