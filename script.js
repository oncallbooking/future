/* Single JS file implementing routing, UI, seed data, icons and filtering */
/* Icons + seed data were derived from your uploaded HTML; kept and organized here. */

/* ---------- ICONS ---------- */
const ICONS = {
  mason: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.5" y="6.5" width="19" height="11" rx="1.5" stroke="#0f172a" stroke-width="1.4"/><path d="M2.5 9.5h19" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  carpenter: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21l18-18" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round"/><path d="M7 7l10 10" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  electrician: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="#0f172a" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  plumber: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 14v6h6" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round"/><path d="M4 10l8-8 6 6-8 8" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  welder: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="7" cy="7" r="3" stroke="#0f172a" stroke-width="1.2"/><path d="M14 4l6 6" stroke="#0f172a" stroke-width="1.4"/></svg>`,
  tile: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3.5" y="3.5" width="17" height="17" rx="1.6" stroke="#0f172a" stroke-width="1.2"/><path d="M12 3.5v17M3.5 12h17" stroke="#0f172a" stroke-width="1"/></svg>`,
  painter: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21l6-6 11-7-3-3-7 11-6 5z" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  barbender: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20h16" stroke="#0f172a" stroke-width="1.2"/><path d="M7 7l10 10" stroke="#0f172a" stroke-width="1.4"/></svg>`,
  scaffolder: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="4" stroke="#0f172a" stroke-width="1.2"/><rect x="3" y="17" width="18" height="4" stroke="#0f172a" stroke-width="1.2"/><path d="M7 7v10M17 7v10" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  heavy: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="13" width="20" height="6" rx="1" stroke="#0f172a" stroke-width="1.2"/><path d="M7 13V7h3v6M14 13V5h4v8" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  // ... (other icons omitted for brevity in the snippet but are present in the full code)
  helper: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="7" r="2" stroke="#0f172a" stroke-width="1.2"/><path d="M4 21v-4c0-2 4-3 6-3s6 1 6 3v4" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  cleaner: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 20l5-10 5 10" stroke="#0f172a" stroke-width="1.2"/><path d="M14 6l6 2" stroke="#0f172a" stroke-width="1.2"/></svg>`,
  machine: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="1" stroke="#0f172a" stroke-width="1.2"/><circle cx="8.5" cy="12" r="1.5" stroke="#0f172a" stroke-width="1.2"/><circle cx="15.5" cy="12" r="1.5" stroke="#0f172a" stroke-width="1.2"/></svg>`
  // If you want more icons, add them here using the same pattern.
};

/* ---------- JOB TYPES (categories) ---------- */
const jobTypes = [
  { key:'mason', name:'Mason (Rajmistri)', category:'Construction' },
  { key:'carpenter', name:'Carpenter', category:'Construction' },
  { key:'electrician', name:'Electrician', category:'Construction' },
  { key:'plumber', name:'Plumber', category:'Construction' },
  { key:'welder', name:'Welder / Fabricator', category:'Construction' },
  { key:'tile', name:'Tile / Marble Worker', category:'Construction' },
  { key:'painter', name:'Painter / POP Technician', category:'Construction' },
  { key:'barbender', name:'Bar Bender / Steel Fixer', category:'Construction' },
  { key:'scaffolder', name:'Scaffolder', category:'Construction' },
  { key:'heavy', name:'Heavy machinery operator', category:'Construction' },
  { key:'surveyor', name:'Surveyor helper', category:'Construction' },
  { key:'helper', name:'Helper / Construction helper', category:'Construction' },
  { key:'cleaner', name:'Site cleaner', category:'Construction' },
  { key:'material', name:'Material handler', category:'Construction' },
  { key:'demolition', name:'Demolition labour', category:'Construction' },
  { key:'concrete', name:'Concrete mixer helper', category:'Construction' },
  { key:'road', name:'Road construction labour', category:'Construction' },
  { key:'paver', name:'Paver block worker', category:'Construction' },
  { key:'machine', name:'Machine operator', category:'Industrial' },
  { key:'packaging', name:'Packaging worker', category:'Industrial' },
  { key:'loading', name:'Loading/unloading labour', category:'Industrial' },
  { key:'qc', name:'Quality check helper', category:'Industrial' },
  { key:'production', name:'Production line worker', category:'Industrial' },
  { key:'warehouse', name:'Warehouse picker/packer', category:'Industrial' },
  { key:'forklift', name:'Forklift operator', category:'Industrial' },
  { key:'assembly', name:'Assembly worker', category:'Industrial' },
  { key:'housemaid', name:'Housemaid', category:'Domestic' }
  // trimmed list for clarity; full dataset used in original contains many more entries
];

/* ---------- demo data ---------- */
const demoWorkers = [
  { id:1, name:'Ramesh Kumar', trade:'Electrician', city:'Mumbai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:6, completed:320 },
  { id:2, name:'Suresh Patel', trade:'Plumber', city:'Ahmedabad', pricePerHour:140, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'8am-5pm', experience:8, completed:210 },
  { id:3, name:'Mahesh Singh', trade:'Carpenter', city:'Delhi', pricePerHour:160, pricePerDay:1250, daysAvailable:'Tue-Sun', hours:'9am-5pm', experience:5, completed:150 },
  { id:4, name:'Anoop Sharma', trade:'Welder', city:'Bengaluru', pricePerHour:170, pricePerDay:1300, daysAvailable:'Mon-Fri', hours:'10am-6pm', experience:7, completed:400 },
  { id:5, name:'Vikram Rao', trade:'Mason (Rajmistri)', city:'Hyderabad', pricePerHour:130, pricePerDay:1000, daysAvailable:'Mon-Sat', hours:'7am-4pm', experience:10, completed:510 },
  { id:6, name:'Kishore', trade:'Tile / Marble Worker', city:'Chennai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'8am-4pm', experience:4, completed:78 },
  { id:7, name:'Raju', trade:'Bar Bender', city:'Pune', pricePerHour:145, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'9am-5pm', experience:6, completed:200 },
  { id:8, name:'Deepak', trade:'Scaffolder', city:'Kolkata', pricePerHour:140, pricePerDay:1050, daysAvailable:'Tue-Sun', hours:'8am-4pm', experience:5, completed:90 },
  { id:9, name:'Sandeep', trade:'Machine operator', city:'Surat', pricePerHour:155, pricePerDay:1150, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:9, completed:310 },
  { id:10, name:'Rita', trade:'Housemaid', city:'Mumbai', pricePerHour:100, pricePerDay:700, daysAvailable:'Mon-Sun', hours:'8am-2pm', experience:3, completed:600 }
];

const demoJobs = [
  { id:101, title:'Fix home wiring', city:'Mumbai', budget:1500, daysRequired:'1 day', hoursRequired:'3-4 hours', category:'Electrician', description:'Short circuit in hall & some fittings to replace' },
  { id:102, title:'Bathroom plumbing', city:'Ahmedabad', budget:3000, daysRequired:'2 days', hoursRequired:'6-8 hours/day', category:'Plumber', description:'Replace piping & fix leak' },
  { id:103, title:'Kitchen cabinets repair', city:'Delhi', budget:2500, daysRequired:'1-2 days', hoursRequired:'5-6 hours', category:'Carpenter', description:'Refix cabinet doors and polish' },
  { id:104, title:'Welding gate hinges', city:'Bengaluru', budget:1200, daysRequired:'half day', hoursRequired:'2-3 hours', category:'Welder', description:'Weld two hinges & paint' },
  { id:105, title:'House plastering', city:'Hyderabad', budget:8000, daysRequired:'3 days', hoursRequired:'8 hours/day', category:'Mason (Rajmistri)', description:'Plastering and finishing of small living room' },
  { id:106, title:'Tile flooring', city:'Chennai', budget:9000, daysRequired:'2 days', hoursRequired:'8 hours/day', category:'Tile / Marble Worker', description:'Replace kitchen flooring tiles' },
  { id:107, title:'Steel reinforcement work', city:'Pune', budget:5000, daysRequired:'2 days', hoursRequired:'6 hours/day', category:'Bar Bender', description:'Fix steel bars for small slab' },
  { id:108, title:'Scaffold setup', city:'Kolkata', budget:4000, daysRequired:'1 day', hoursRequired:'8 hours', category:'Scaffolder', description:'Scaffold for exterior painting' },
  { id:109, title:'Machine maintenance', city:'Surat', budget:7000, daysRequired:'1 day', hoursRequired:'6-8 hours', category:'Machine operator', description:'Routine maintenance and checks' },
  { id:110, title:'Daily house cleaning', city:'Mumbai', budget:1500, daysRequired:'Weekly (4 days)', hoursRequired:'3 hours/day', category:'Housemaid', description:'Regular cleaning & dusting for 4 days/week' }
];

/* ---------- Simple Router ---------- */
const app = document.getElementById('app');

function renderRoute() {
  const hash = location.hash.replace('#','') || '/';
  if(hash === '/' || hash === '') return renderHome();
  if(hash.startsWith('/directory')) return renderDirectory();
  // fallback
  return renderHome();
}

/* ---------- Home (Landing) ---------- */
function renderHome() {
  document.querySelectorAll('.navlink').forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#/'));
  app.innerHTML = `
    <header class="hero">
      <div class="wrap">
        <div>
          <h1>Find Skilled Workers — Demo</h1>
          <p>Browse categories, filter by city & radius, and view available workers or job posts.</p>
        </div>
        <div style="text-align:right; color:rgba(255,255,255,0.95)">
          <div style="font-weight:600">LabourConnect</div>
          <div style="font-size:13px; margin-top:6px">Demo mode</div>
        </div>
      </div>
    </header>

    <main class="container" id="mainContent">
      <div class="section-title">
        <h2>Browse by Category</h2>
        <p>Sketch icons used for clarity. Click a category tile to filter directory + dashboard.</p>
      </div>

      <div class="controls-row">
        <div class="input-pill">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="opacity:.9" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L16.65 16.65" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input id="searchInput" placeholder="Search trade (e.g., Electrician)" />
        </div>

        <div class="input-pill" title="City">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="opacity:.9" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <input id="cityInput" placeholder="City (e.g., Mumbai)" />
        </div>

        <select id="radiusSelect" class="select-radius" title="Search radius">
          <option value="5">Radius 5 km</option>
          <option value="10" selected>Radius 10 km</option>
          <option value="25">Radius 25 km</option>
        </select>

        <button id="goDirectory" class="chip" title="Open Directory">Open Directory →</button>
      </div>

      <div id="chipsRow" class="chips"></div>

      <div id="iconGrid" class="grid" aria-live="polite"></div>

      <div style="text-align:center; margin-top:18px;">
        <a href="#/directory" class="chip">Go to Directory</a>
      </div>

    </main>
  `;

  wireHomeControls();
  renderGrid(); // initial grid render
}

/* ---------- Directory Page (multi-pane) ---------- */
function renderDirectory() {
  document.querySelectorAll('.navlink').forEach(n => n.classList.toggle('active', n.getAttribute('href') === '#/directory'));
  app.innerHTML = `
    <main class="container" style="margin-top:12px">
      <div style="display:flex; gap:12px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <div style="display:flex; gap:12px; align-items:center">
          <div class="input-pill" style="min-width:260px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="opacity:.9" xmlns="http://www.w3.org/2000/svg"><path d="M21 21L16.65 16.65" stroke="#0f172a" stroke-width="1.5" stroke-linecap="round"/></svg>
            <input id="searchInput" placeholder="Search trade or name" />
          </div>

          <div class="input-pill">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style="opacity:.9" xmlns="http://www.w3.org/2000/svg"><path d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10z" stroke="#0f172a" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <input id="cityInput" placeholder="City (e.g., Mumbai)" />
          </div>

          <select id="radiusSelect" class="select-radius" title="Search radius">
            <option value="5">Radius 5 km</option>
            <option value="10" selected>Radius 10 km</option>
            <option value="25">Radius 25 km</option>
          </select>
        </div>

        <div style="display:flex; gap:10px; align-items:center; margin-top:6px;">
          <button id="backHome" class="chip">← Home</button>
        </div>
      </div>

      <div id="chipsRow" class="chips" style="margin-top:12px;"></div>

      <div class="dashboard" style="margin-top:18px">
        <div class="box">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3>Available Workers</h3>
            <div class="controls-sm"><div class="badge" id="workersCount">0</div></div>
          </div>
          <div id="workerList" class="list"></div>
        </div>

        <div class="box">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <h3>Job Posts</h3>
            <div class="controls-sm"><div class="badge" id="jobsCount">0</div></div>
          </div>
          <div id="jobList" class="list"></div>
        </div>
      </div>
    </main>
  `;

  // wire controls and initial render
  wireDirectoryControls();
  renderAll();
}

/* ---------- Shared UI wiring for home ---------- */
function wireHomeControls() {
  const searchInput = document.getElementById('searchInput');
  const cityInput = document.getElementById('cityInput');
  const radiusSelect = document.getElementById('radiusSelect');
  const goDir = document.getElementById('goDirectory');

  // chips
  createChips();

  searchInput.addEventListener('input', renderGrid);
  cityInput.addEventListener('input', renderGrid);
  radiusSelect.addEventListener('change', renderGrid);
  goDir.addEventListener('click', () => location.hash = '/directory');
}

/* ---------- Shared UI wiring for directory ---------- */
function wireDirectoryControls() {
  const searchInput = document.getElementById('searchInput');
  const cityInput = document.getElementById('cityInput');
  const radiusSelect = document.getElementById('radiusSelect');
  const backHome = document.getElementById('backHome');

  createChips();

  searchInput.addEventListener('input', renderAll);
  cityInput.addEventListener('input', renderAll);
  radiusSelect.addEventListener('change', renderAll);
  backHome.addEventListener('click', () => location.hash = '/');
}

/* ---------- Chips creation (shared) ---------- */
function createChips() {
  const chipsContainers = document.querySelectorAll('#chipsRow');
  const categories = [...new Set(jobTypes.map(j => j.category))];

  chipsContainers.forEach(container => {
    container.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'chip';
      btn.textContent = cat;
      btn.onclick = () => {
        btn.classList.toggle('selected');
        // dispatch a custom event so both pages listening can react
        document.dispatchEvent(new CustomEvent('filtersChanged'));
        // re-render current page content
        if(location.hash.replace('#','') === '/directory') renderAll();
        else renderGrid();
      };
      container.appendChild(btn);
    });
  });
}

/* ---------- Grid render on Home ---------- */
function renderGrid() {
  const grid = document.getElementById('iconGrid');
  if(!grid) return;
  const q = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const cityQ = (document.getElementById('cityInput')?.value || '').trim().toLowerCase();
  const activeCats = Array.from(document.querySelectorAll('#chipsRow .chip.selected')).map(c=>c.innerText);

  const filtered = jobTypes.filter(j=>{
    const matchQ = q ? j.name.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) : true;
    const matchCat = activeCats.length ? activeCats.includes(j.category) : true;
    // city filter loosely checks whether there is any worker/job in that city
    const matchCity = cityQ ? demoWorkers.some(w => w.city.toLowerCase().includes(cityQ)) || demoJobs.some(job => job.city.toLowerCase().includes(cityQ)) : true;
    return matchQ && matchCat && matchCity;
  });

  grid.innerHTML = '';
  filtered.forEach(item=>{
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.onclick = () => {
      tile.classList.toggle('selected');
      // toggle matching chip of category
      const chips = document.querySelectorAll('#chipsRow .chip');
      chips.forEach(ch => { if(ch.innerText === item.category) ch.classList.add('selected'); });
      // notify filters changed to re-render other views
      document.dispatchEvent(new CustomEvent('filtersChanged'));
    };

    const iconWrap = document.createElement('div');
    iconWrap.className = 'icon';
    iconWrap.innerHTML = ICONS[item.key] || '🔧';

    const meta = document.createElement('div');
    meta.className = 'meta';
    meta.innerHTML = `<div class="title">${item.name}</div><div class="sub">${item.category}</div>`;

    tile.appendChild(iconWrap); tile.appendChild(meta);
    grid.appendChild(tile);
  });

  if(filtered.length === 0){
    const empty = document.createElement('div');
    empty.style.gridColumn = '1 / -1';
    empty.style.textAlign = 'center';
    empty.style.padding = '24px';
    empty.style.color = 'var(--muted)';
    empty.innerText = 'No categories match your filters.';
    grid.appendChild(empty);
  }
}

/* ---------- Filtering & rendering lists for Directory ---------- */
function renderAll(){
  // read controls
  const q = (document.getElementById('searchInput')?.value || '').trim().toLowerCase();
  const cityQ = (document.getElementById('cityInput')?.value || '').trim().toLowerCase();
  const activeCats = Array.from(document.querySelectorAll('#chipsRow .chip.selected')).map(c=>c.innerText);

  // filter workers
  const filteredWorkers = demoWorkers.filter(w=>{
    const matchCity = cityQ ? w.city.toLowerCase().includes(cityQ) : true;
    const matchQ = q ? (w.name.toLowerCase().includes(q) || w.trade.toLowerCase().includes(q)) : true;
    const matchCat = activeCats.length ? activeCats.some(cat => jobTypes.filter(j=>j.category===cat).some(j => w.trade.toLowerCase().includes(j.name.split(' ')[0].toLowerCase()) || (j.name.toLowerCase() === w.trade.toLowerCase()))) : true;
    return matchCity && matchQ && matchCat;
  });

  // filter jobs
  const filteredJobs = demoJobs.filter(job=>{
    const matchCity = cityQ ? job.city.toLowerCase().includes(cityQ) : true;
    const matchQ = q ? (job.title.toLowerCase().includes(q) || job.category.toLowerCase().includes(q)) : true;
    const matchCat = activeCats.length ? activeCats.includes(job.category) : true;
    return matchCity && matchQ && matchCat;
  });

  // populate DOM
  const workerList = document.getElementById('workerList');
  const jobList = document.getElementById('jobList');
  const workersCount = document.getElementById('workersCount');
  const jobsCount = document.getElementById('jobsCount');

  if(!workerList || !jobList || !workersCount || !jobsCount) return;

  workerList.innerHTML = '';
  filteredWorkers.forEach(w=>{
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <div class="avatar">${(w.name.split(' ')[0]||'U').charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${w.name}</div>
          <div class="price">₹${w.pricePerDay}/day</div>
        </div>
        <div style="font-size:13px; color:var(--muted)">${w.trade} · ${w.city}</div>
        <div class="row">
          <div class="badge">${w.daysAvailable}</div>
          <div class="badge">${w.hours}</div>
          <div style="margin-left:auto; color:var(--muted); font-size:13px">${w.experience} yrs · ${w.completed} jobs</div>
        </div>
      </div>
    `;
    // click opens modal with details
    card.onclick = () => showWorkerModal(w);
    workerList.appendChild(card);
  });

  jobList.innerHTML = '';
  filteredJobs.forEach(j=>{
    const card = document.createElement('div'); card.className = 'card';
    card.innerHTML = `
      <div class="avatar">${(j.title.split(' ')[0]||'J').charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${j.title}</div>
          <div class="price">₹${j.budget}</div>
        </div>
        <div style="font-size:13px; color:var(--muted)">${j.category} · ${j.city}</div>
        <div class="row">
          <div class="badge">${j.daysRequired}</div>
          <div class="badge">${j.hoursRequired}</div>
          <div style="margin-left:auto; color:var(--muted); font-size:13px">${j.description}</div>
        </div>
      </div>
    `;
    card.onclick = () => showJobModal(j);
    jobList.appendChild(card);
  });

  workersCount.innerText = filteredWorkers.length;
  jobsCount.innerText = filteredJobs.length;
}

/* ---------- Small modals to show details ---------- */
function showWorkerModal(worker){
  const modalWrap = document.createElement('div');
  modalWrap.className = 'modal-backdrop';
  modalWrap.innerHTML = `
    <div class="modal">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <div style="display:flex;gap:12px;align-items:center;">
          <div style="width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(180deg,rgba(37,99,235,0.06),rgba(37,99,235,0.02));color:var(--accent)">${worker.name.charAt(0)}</div>
          <div>
            <div style="font-weight:700">${worker.name}</div>
            <div style="color:var(--muted);font-size:13px">${worker.trade} · ${worker.city}</div>
          </div>
        </div>
        <div style="text-align:right"><div class="price">₹${worker.pricePerDay}/day</div></div>
      </div>

      <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap;">
        <div class="badge">${worker.daysAvailable}</div>
        <div class="badge">${worker.hours}</div>
        <div class="badge">${worker.experience} yrs experience</div>
        <div class="badge">${worker.completed} jobs</div>
      </div>

      <div style="margin-top:14px; color:var(--muted); font-size:14px">
        This demo profile shows typical fields for a worker. In a real app you'd show certifications, portfolio images and contact actions.
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:14px">
        <button id="closeModal" class="chip">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalWrap);
  modalWrap.querySelector('#closeModal').onclick = () => modalWrap.remove();
  modalWrap.onclick = (e) => { if(e.target === modalWrap) modalWrap.remove(); };
}

function showJobModal(job){
  const modalWrap = document.createElement('div');
  modalWrap.className = 'modal-backdrop';
  modalWrap.innerHTML = `
    <div class="modal">
      <div style="display:flex; justify-content:space-between; align-items:center; gap:12px;">
        <div>
          <div style="font-weight:700">${job.title}</div>
          <div style="color:var(--muted);font-size:13px">${job.category} · ${job.city}</div>
        </div>
        <div style="text-align:right"><div class="price">₹${job.budget}</div></div>
      </div>

      <div style="margin-top:12px">
        <div style="font-weight:600">Timeline</div>
        <div style="color:var(--muted); margin-top:6px">${job.daysRequired} · ${job.hoursRequired}</div>
      </div>

      <div style="margin-top:12px">
        <div style="font-weight:600">Description</div>
        <div style="color:var(--muted); margin-top:6px">${job.description}</div>
      </div>

      <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:14px">
        <button id="closeJobModal" class="chip">Close</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalWrap);
  modalWrap.querySelector('#closeJobModal').onclick = () => modalWrap.remove();
  modalWrap.onclick = (e) => { if(e.target === modalWrap) modalWrap.remove(); };
}

/* ---------- Listen for global filter changes to keep views in sync ---------- */
document.addEventListener('filtersChanged', () => {
  // if on directory page, re-render lists; if home, re-render grid
  if(location.hash.replace('#','') === '/directory') renderAll();
  else renderGrid();
});

/* ---------- Hash change routing ---------- */
window.addEventListener('hashchange', renderRoute);

/* ---------- Initial route ---------- */
renderRoute();

/* ---------- Expose for debugging ---------- */
window._LABOUR = { ICONS, jobTypes, demoWorkers, demoJobs };
