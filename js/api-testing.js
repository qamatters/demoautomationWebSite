const scenarios = [
  {
    id: 'rest-1',
    category: 'rest',
    title: 'REST: List Posts (JSONPlaceholder)',
    purpose: 'Validate GET collection response schema, status code 200, and array count handling.',
    endpoint: 'https://jsonplaceholder.typicode.com/posts?_limit=3',
    curl: "curl -X GET 'https://jsonplaceholder.typicode.com/posts?_limit=3'",
    runMode: 'rest-get'
  },
  {
    id: 'rest-2',
    category: 'rest',
    title: 'REST: Create User (ReqRes)',
    purpose: 'Validate POST request body handling and 201-style resource creation response fields.',
    endpoint: 'https://reqres.in/api/users',
    curl: 'curl -X POST https://reqres.in/api/users -H "Content-Type: application/json" -d "{\"name\":\"Mia\",\"job\":\"QA Engineer\"}"',
    runMode: 'rest-post',
    body: { name: 'Mia', job: 'QA Engineer' }
  },
  {
    id: 'rest-3',
    category: 'rest',
    title: 'REST: Live Weather (Open-Meteo)',
    purpose: 'Validate real-world API data fields and changing values from free public weather endpoint.',
    endpoint: 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m',
    curl: "curl -X GET 'https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&current=temperature_2m,wind_speed_10m'",
    runMode: 'rest-get'
  },
  {
    id: 'graphql-1',
    category: 'graphql',
    title: 'GraphQL: Country by Code',
    purpose: 'Validate GraphQL query structure and object field assertions.',
    endpoint: 'https://countries.trevorblades.com/',
    curl: 'curl -X POST https://countries.trevorblades.com/ -H "Content-Type: application/json" -d "{\"query\":\"query { country(code: \\\"US\\\") { name capital currency } }\"}"',
    runMode: 'graphql',
    query: 'query { country(code: "US") { name capital currency } }'
  },
  {
    id: 'graphql-2',
    category: 'graphql',
    title: 'GraphQL: Countries by Continent',
    purpose: 'Validate list responses and iterate assertion for nested fields in arrays.',
    endpoint: 'https://countries.trevorblades.com/',
    curl: 'curl -X POST https://countries.trevorblades.com/ -H "Content-Type: application/json" -d "{\"query\":\"query { continent(code: \\\"EU\\\") { name countries { code name } } }\"}"',
    runMode: 'graphql',
    query: 'query { continent(code: "EU") { name countries { code name } } }'
  },
  {
    id: 'graphql-3',
    category: 'graphql',
    title: 'GraphQL: Languages Snapshot',
    purpose: 'Validate pagination-like constraints and check field-level presence in repeated nodes.',
    endpoint: 'https://countries.trevorblades.com/',
    curl: 'curl -X POST https://countries.trevorblades.com/ -H "Content-Type: application/json" -d "{\"query\":\"query { languages { code name native } }\"}"',
    runMode: 'graphql',
    query: 'query { languages { code name native } }'
  },
  {
    id: 'grpc-1',
    category: 'grpc',
    title: 'gRPC: Health Check',
    purpose: 'Validate service availability using standard grpc.health.v1 endpoint.',
    endpoint: 'grpcb.in:9000',
    curl: 'grpcurl -plaintext -d "{}" grpcb.in:9000 grpc.health.v1.Health/Check',
    runMode: 'manual',
    sampleResponse: '{\n  "status": "SERVING"\n}'
  },
  {
    id: 'grpc-2',
    category: 'grpc',
    title: 'gRPC: Echo Message',
    purpose: 'Validate request/response payload mapping for unary call.',
    endpoint: 'grpcb.in:9000',
    curl: 'grpcurl -plaintext -d "{\"message\":\"hello\"}" grpcb.in:9000 grpcbin.GRPCBin/DummyUnary',
    runMode: 'manual',
    sampleResponse: '{\n  "response_size": 0,\n  "payload": {\n    "body": "aGVsbG8="\n  }\n}'
  },
  {
    id: 'grpc-3',
    category: 'grpc',
    title: 'gRPC: Server Reflection',
    purpose: 'Validate discoverability and proto contract exposure in test environments.',
    endpoint: 'grpcb.in:9000',
    curl: 'grpcurl -plaintext grpcb.in:9000 list',
    runMode: 'manual',
    sampleResponse: 'grpc.health.v1.Health\ngrpc.reflection.v1alpha.ServerReflection\ngrpcbin.GRPCBin'
  }
];

function cardTemplate(item) {
  return `
    <article class="bg-white shadow rounded-lg p-5" data-category="${item.category}">
      <div class="flex flex-wrap gap-2 items-center mb-3">
        <span class="px-3 py-1 text-xs rounded-full bg-gray-200 uppercase">${item.category}</span>
        <h2 class="text-xl font-semibold">${item.title}</h2>
      </div>
      <p class="text-sm text-gray-700 mb-2"><strong>Endpoint:</strong> ${item.endpoint}</p>
      <p class="text-sm text-gray-700 mb-4"><strong>Why test this:</strong> ${item.purpose}</p>

      <h3 class="font-semibold mb-2">cURL</h3>
      <pre class="bg-gray-900 text-gray-100 p-3 rounded text-sm overflow-x-auto" id="curl-${item.id}">${item.curl}</pre>

      <div class="mt-3 flex flex-wrap gap-3">
        <button class="copy-btn bg-blue-600 text-white px-3 py-2 rounded" data-target="curl-${item.id}">Copy cURL</button>
        <button class="run-btn bg-green-600 text-white px-3 py-2 rounded" data-id="${item.id}">Run Request</button>
      </div>

      <h3 class="font-semibold mt-4 mb-2">Response</h3>
      <pre class="bg-black text-green-100 p-3 rounded text-sm overflow-x-auto min-h-[110px]" id="result-${item.id}">${item.sampleResponse ? item.sampleResponse : 'Click "Run Request" to view response.'}</pre>
    </article>`;
}

function renderScenarios(filter = 'all') {
  const container = document.getElementById('scenarioContainer');
  const selected = filter === 'all' ? scenarios : scenarios.filter(item => item.category === filter);
  container.innerHTML = selected.map(cardTemplate).join('');

  document.querySelectorAll('.copy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      navigator.clipboard.writeText(target.innerText);
      button.textContent = 'Copied!';
      setTimeout(() => {
        button.textContent = 'Copy cURL';
      }, 1200);
    });
  });

  document.querySelectorAll('.run-btn').forEach(button => {
    button.addEventListener('click', async () => {
      const scenario = scenarios.find(item => item.id === button.dataset.id);
      const result = document.getElementById(`result-${scenario.id}`);

      if (scenario.runMode === 'manual') {
        result.textContent = 'This gRPC scenario is manual from browser. Run with grpcurl in terminal.';
        return;
      }

      result.textContent = 'Running request...';
      try {
        if (scenario.runMode === 'rest-get') {
          const response = await fetch(scenario.endpoint);
          const data = await response.json();
          result.textContent = JSON.stringify(data, null, 2);
          return;
        }

        if (scenario.runMode === 'rest-post') {
          const response = await fetch(scenario.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scenario.body)
          });
          const data = await response.json();
          result.textContent = JSON.stringify(data, null, 2);
          return;
        }

        if (scenario.runMode === 'graphql') {
          const response = await fetch(scenario.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: scenario.query })
          });
          const data = await response.json();
          result.textContent = JSON.stringify(data, null, 2);
        }
      } catch (error) {
        result.textContent = `Request failed. Possible CORS/network issue.\n${error.message}`;
      }
    });
  });
}

document.querySelectorAll('.filter-btn').forEach(button => {
  button.addEventListener('click', () => {
    renderScenarios(button.dataset.filter);
  });
});

renderScenarios();
