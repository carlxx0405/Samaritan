const router = new Navigo('/', { hash: true });
const main = document.getElementById('main-content');

// Views
const dashboardView = () => `
  <h1 class="text-2xl font-semibold mb-6">Dashboard</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="bg-white p-4 rounded shadow">
      <h2 class="font-bold mb-2">Recent Requests</h2>
      <p class="text-sm text-gray-500">You have 3 active requests</p>
    </div>
    <div class="bg-white p-4 rounded shadow">
      <h2 class="font-bold mb-2">Responded Donors</h2>
      <p class="text-sm text-gray-500">5 donors have responded today</p>
    </div>
  </div>
  <div class="mt-6 bg-white p-4 rounded shadow">
    <h2 class="font-bold mb-2">Blood Stock Overview</h2>
    <div class="grid grid-cols-4 gap-4 mt-4">
      ${['A', 'B', 'AB', 'O'].map(type => `
        <div class="bg-red-50 p-4 rounded text-center shadow-sm">
          <h3 class="font-bold text-red-600 text-xl">${type}</h3>
          <p class="text-gray-600 text-sm">24 units</p>
        </div>
      `).join('')}
    </div>
  </div>
`;

const requestView = () => `
  <h1 class="text-2xl font-semibold mb-6">Create Blood Request</h1>
  <div class="bg-white p-6 rounded shadow space-y-4 max-w-xl">
    <div>
      <label class="block text-sm font-medium">Blood Type</label>
      <select class="w-full mt-1 border p-2 rounded">
        <option>A</option><option>B</option><option>AB</option><option>O</option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium">Quantity (units)</label>
      <input type="number" class="w-full mt-1 border p-2 rounded" />
    </div>
    <div>
      <label class="block text-sm font-medium">Location</label>
      <input type="text" class="w-full mt-1 border p-2 rounded" />
      <p class="text-sm text-semibold text-blue-400">Use registered Location</p>
    </div>
    <div>
      <label class="block text-sm font-medium">Urgency</label>
      <select class="w-full mt-1 border p-2 rounded">
        <option>Low</option><option>Medium</option><option>High</option>
      </select>
    </div>
    <button class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Submit Request</button>
  </div>
`;

const availabilityView = () => `
  <h1 class="text-2xl font-semibold mb-6">Update Blood Stock</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    ${['A', 'B', 'AB', 'O'].map(type => `
      <div class="bg-white p-4 rounded shadow flex items-center justify-between">
        <span class="font-bold text-lg">${type}</span>
        <input type="number" class="w-24 border p-1 rounded" placeholder="Units" />
        <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Update</button>
      </div>
    `).join('')}
  </div>
`;

const renderWithAuth = (viewFn) => {
  const email = localStorage.getItem("hospitalEmail");
  if (!email) {
    window.location.href = "../hospital/hospitalRegister.html";
    return;
  }
  render(viewFn());
};

// View Loader
const render = (html) => {
  main.innerHTML = html;
};

// Router Setup
router.on({
  '/': () => render(dashboardView()),
  '/requests': () => render(requestView()),
  '/availability': () => render(availabilityView()),
  '/logout': () => {
    localStorage.removeItem("hospitalEmail");
    window.location.href = "../Index.html";
  }
}).resolve();

window.addEventListener('DOMContentLoaded', () => {
  router.updatePageLinks();
});
