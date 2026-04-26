function updateYear() {
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function wireApiConsole() {
  const form = document.getElementById('api-console-form');
  if (!form) return;

  const output = document.getElementById('api-console-output');

  const fakeDb = {
    '/v1/users/42': { status: 200, body: { id: 42, name: 'Ava QA', role: 'SDET' } },
    '/v1/orders/1001': { status: 200, body: { id: 1001, state: 'SHIPPED', amount: 199.99 } },
    '/v1/orders': { status: 201, body: { id: 1200, state: 'CREATED' } }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const method = form.method.value.toUpperCase();
    const endpoint = form.endpoint.value.trim();
    const token = form.token.value.trim();

    const start = performance.now();

    let response;
    if (!token) {
      response = { status: 401, body: { error: 'Missing bearer token' } };
    } else if (method === 'GET' && fakeDb[endpoint]) {
      response = fakeDb[endpoint];
    } else if (method === 'POST' && endpoint === '/v1/orders') {
      response = fakeDb['/v1/orders'];
    } else if (endpoint === '/v1/payments' && method === 'POST') {
      response = { status: 429, body: { error: 'Rate limit exceeded', retryAfterSec: 30 } };
    } else {
      response = { status: 404, body: { error: 'Not found' } };
    }

    const elapsed = Math.round(performance.now() - start + Math.random() * 180);
    output.textContent = JSON.stringify({ ...response, latencyMs: elapsed }, null, 2);
  });
}

function wireSecurityLabs() {
  const reflectBtn = document.getElementById('reflect-btn');
  if (reflectBtn) {
    reflectBtn.addEventListener('click', () => {
      const input = document.getElementById('reflect-input').value;
      document.getElementById('reflect-output').textContent = input;
    });
  }

  const weakPwdBtn = document.getElementById('pwd-check-btn');
  if (weakPwdBtn) {
    weakPwdBtn.addEventListener('click', () => {
      const val = document.getElementById('pwd-input').value;
      const issues = [];
      if (val.length < 12) issues.push('Length < 12');
      if (!/[A-Z]/.test(val)) issues.push('Missing uppercase');
      if (!/[a-z]/.test(val)) issues.push('Missing lowercase');
      if (!/[0-9]/.test(val)) issues.push('Missing number');
      if (!/[^A-Za-z0-9]/.test(val)) issues.push('Missing special char');
      document.getElementById('pwd-output').textContent = issues.length
        ? `Weak password: ${issues.join(', ')}`
        : 'Strong password policy met.';
    });
  }
}

function wirePerformanceLabs() {
  const domBtn = document.getElementById('dom-btn');
  if (domBtn) {
    domBtn.addEventListener('click', () => {
      const mount = document.getElementById('dom-mount');
      const start = performance.now();
      let html = '';
      for (let i = 0; i < 2500; i += 1) {
        html += `<li class="p-1 border-b">Synthetic list row ${i + 1}</li>`;
      }
      mount.innerHTML = `<ul class="max-h-56 overflow-auto text-sm">${html}</ul>`;
      const total = Math.round(performance.now() - start);
      document.getElementById('dom-time').textContent = `${total} ms to render 2,500 nodes`;
    });
  }

  const apiBtn = document.getElementById('slow-api-btn');
  if (apiBtn) {
    apiBtn.addEventListener('click', async () => {
      const label = document.getElementById('slow-api-output');
      label.textContent = 'Simulating 1.8s API call...';
      const start = performance.now();
      await new Promise((resolve) => setTimeout(resolve, 1800));
      const total = Math.round(performance.now() - start);
      label.textContent = `Completed in ${total} ms (assert timeout/retry behavior).`;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  wireApiConsole();
  wireSecurityLabs();
  wirePerformanceLabs();
});
