const assert = require('node:assert/strict');
const base = 'http://localhost/gr8/api';
async function request(path, options = {}) {
  const response = await fetch(base + path, options);
  const body = await response.json();
  return { status: response.status, body };
}
(async () => {
  const session = await request('/project-visitors/get_session.php');
  assert.equal(session.status, 200);
  assert.equal(session.body.verified, false);
  const visitors = await request('/project-visitors/get_visitors.php');
  assert.equal(visitors.status, 401);
  const badOrigin = await request('/project-visitors/get_session.php', { headers: { Origin: 'https://unapproved.example.com' } });
  assert.equal(badOrigin.status, 403);
  const body = { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'http://localhost:3000' } };
  const visit = await request('/project-visitors/record_visit.php', { ...body, body: JSON.stringify({ category: 'web-development', visit_id: '00000000-0000-0000-0000-000000000000' }) });
  assert.equal(visit.status, 401);
  const verify = await request('/project-visitors/verify.php', { ...body, body: JSON.stringify({ code: '123456' }) });
  assert.equal(verify.status, 400);
  const details = await request('/project-visitors/request_code.php', { ...body, body: JSON.stringify({ name: '', email: 'bad', category: 'web-development' }) });
  assert.equal(details.status, 422);
  const wrongMethod = await request('/project-visitors/request_code.php');
  assert.equal(wrongMethod.status, 405);
  const works = await request('/works/get_works.php', { headers: { Origin: 'http://localhost:3000' } });
  assert.equal(works.status, 200);
  assert.equal(works.body.content.home.panels.length, 3);
  assert.equal(works.body.content.web_development.projects.length, 0);
  assert.equal(works.body.content.digital_marketing.clients.length, 0);
  assert.equal(works.body.content.virtual_assistance.clients.length, 0);
  console.log('Live PHP HTTP checks passed: anonymous session, admin protection, origin validation, unauthenticated visit, verification, invalid input, method restriction, protected project content.');
})().catch(error => { console.error(error); process.exitCode = 1; });
