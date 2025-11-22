/* LabourConnect Demo - script.js
   - Filtering by search, city, radius, and category chips
   - Details modal for worker/job
   - WhatsApp chat gating with mock recharge (localStorage)
*/

/* ---------- ICONS (sketch svg snippets reused by key) ---------- */
const ICONS = {
  mason: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><rect x="2.5" y="6.5" width="19" height="11" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M2.5 9.5h19" stroke="currentColor" stroke-width="1"/></svg>`,
  carpenter: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M3 21l18-18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>`,
  electrician:`<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`,
  plumber:`<svg width="36" height="36" viewBox="0 0 24 24" fill="none"><path d="M6 14v6h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M4 10l8-8 6 6-8 8" stroke="currentColor" stroke-width="1.2"/></svg>`,
  // ... you'll see all icons in the next 'jobTypes' mapping keys
};

/* ---------- DATA: jobTypes, demoWorkers, demoJobs ---------- */
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
  { key:'heavy', name:'Heavy machinery operator (JCB/crane/loader/excavator)', category:'Construction' },
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

  { key:'sowing', name:'Sowing labour', category:'Agriculture' },
  { key:'harvesting', name:'Harvesting labour', category:'Agriculture' },
  { key:'irrigation', name:'Irrigation worker', category:'Agriculture' },
  { key:'fertilizer', name:'Fertilizer & pesticide sprayer', category:'Agriculture' },
  { key:'plantation', name:'Plantation workers (tea/coffee/etc.)', category:'Agriculture' },
  { key:'tractor', name:'Tractor driver', category:'Agriculture' },
  { key:'dairy', name:'Dairy farm helper', category:'Agriculture' },
  { key:'poultry', name:'Poultry farm labour', category:'Agriculture' },

  { key:'housemaid', name:'Housemaid', category:'Domestic' },
  { key:'cook', name:'Cook', category:'Domestic' },
  { key:'babysitter', name:'Babysitter', category:'Domestic' },
  { key:'caretaker', name:'Elderly caretaker', category:'Domestic' },
  { key:'cleaning_worker', name:'House cleaning worker', category:'Domestic' },
  { key:'driver', name:'Driver', category:'Domestic' },
  { key:'gardener', name:'Gardner / Mali', category:'Domestic' },
  { key:'watchman', name:'Watchman / Security guard', category:'Domestic' },

  { key:'loader', name:'Loaders / unloaders', category:'Transport' },
  { key:'tempo', name:'Tempo/Truck helpers', category:'Transport' },
  { key:'parcel', name:'Parcel handling labour', category:'Transport' },
  { key:'porter', name:'Porter / coolie', category:'Transport' },
  { key:'delivery', name:'Delivery helpers', category:'Transport' },

  { key:'eventsetup', name:'Event setup labour', category:'Events' },
  { key:'catering', name:'Catering workers', category:'Events' },
  { key:'waiter', name:'Waiters / serving staff', category:'Events' },
  { key:'sound', name:'Sound & lighting setup labour', category:'Events' },
  { key:'decor', name:'Decoration workers', category:'Events' },
  { key:'bouncer', name:'Bouncers', category:'Events' },

  { key:'store', name:'Store helpers', category:'Retail' },
  { key:'merch', name:'Merchandising helpers', category:'Retail' },
  { key:'billing', name:'Billing assistants (contractual)', category:'Retail' },
  { key:'promo', name:'Promoters / samplers', category:'Retail' },
  { key:'flyer', name:'Flyer distributors', category:'Retail' },
  { key:'stock', name:'Stock fillers', category:'Retail' }
];

/* ---------- demo Workers (10) and Jobs (10) ---------- */
const demoWorkers = [
  { id:1, name:'Ramesh Kumar', trade:'Electrician', city:'Mumbai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:6, completed:320, phone:'+919876543210' },
  { id:2, name:'Suresh Patel', trade:'Plumber', city:'Ahmedabad', pricePerHour:140, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'8am-5pm', experience:8, completed:210, phone:'+919812345678' },
  { id:3, name:'Mahesh Singh', trade:'Carpenter', city:'Delhi', pricePerHour:160, pricePerDay:1250, daysAvailable:'Tue-Sun', hours:'9am-5pm', experience:5, completed:150, phone:'+919700112233' },
  { id:4, name:'Anoop Sharma', trade:'Welder', city:'Bengaluru', pricePerHour:170, pricePerDay:1300, daysAvailable:'Mon-Fri', hours:'10am-6pm', experience:7, completed:400, phone:'+919866554433' },
  { id:5, name:'Vikram Rao', trade:'Mason (Rajmistri)', city:'Hyderabad', pricePerHour:130, pricePerDay:1000, daysAvailable:'Mon-Sat', hours:'7am-4pm', experience:10, completed:510, phone:'+919812002211' },
  { id:6, name:'Kishore', trade:'Tile / Marble Worker', city:'Chennai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'8am-4pm', experience:4, completed:78, phone:'+919845612300' },
  { id:7, name:'Raju', trade:'Bar Bender', city:'Pune', pricePerHour:145, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'9am-5pm', experience:6, completed:200, phone:'+919833445566' },
  { id:8, name:'Deepak', trade:'Scaffolder', city:'Kolkata', pricePerHour:140, pricePerDay:1050, daysAvailable:'Tue-Sun', hours:'8am-4pm', experience:5, completed:90, phone:'+919811223344' },
  { id:9, name:'Sandeep', trade:'Machine operator', city:'Surat', pricePerHour:155, pricePerDay:1150, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:9, completed:310, phone:'+919877665544' },
  { id:10, name:'Rita', trade:'Housemaid', city:'Mumbai', pricePerHour:100, pricePerDay:700, daysAvailable:'Mon-Sun', hours:'8am-2pm', experience:3, completed:600, phone:'+919900112233' }
];

const demoJobs = [
  { id:101, title:'Fix home wiring', city:'Mumbai', budget:1500, daysRequired:'1 day', hoursRequired:'3-4 hrs', category:'Electrician', description:'Short circuit in hall & replace fittings', phone:'+919812345001' },
  { id:102, title:'Bathroom plumbing', city:'Ahmedabad', budget:3000, daysRequired:'2 days', hoursRequired:'6-8 hrs/day', category:'Plumber', description:'Replace piping & fix leak', phone:'+919812345002' },
  { id:103, title:'Kitchen cabinets repair', city:'Delhi', budget:2500, daysRequired:'1-2 days', hoursRequired:'5-6 hrs', category:'Carpenter', description:'Refix cabinet doors and polish', phone:'+919812345003' },
  { id:104, title:'Welding gate hinges', city:'Bengaluru', budget:1200, daysRequired:'half day', hoursRequired:'2-3 hrs', category:'Welder', description:'Weld two hinges & paint', phone:'+919812345004' },
  { id:105, title:'House plastering', city:'Hyderabad', budget:8000, daysRequired:'3 days', hoursRequired:'8 hrs/day', category:'Mason (Rajmistri)', description:'Plastering and finishing of small living room', phone:'+919812345005' },
  { id:106, title:'Tile flooring', city:'Chennai', budget:9000, daysRequired:'2 days', hoursRequired:'8 hrs/day', category:'Tile / Marble Worker', description:'Replace kitchen flooring tiles', phone:'+919812345006' },
  { id:107, title:'Steel reinforcement work', city:'Pune', budget:5000, daysRequired:'2 days', hoursRequired:'6 hrs/day', category:'Bar Bender', description:'Fix steel bars for small slab', phone:'+919812345007' },
  { id:108, title:'Scaffold setup', city:'Kolkata', budget:4000, daysRequired:'1 day', hoursRequired:'8 hrs', category:'Scaffolder', description:'Scaffold for exterior painting', phone:'+919812345008' },
  { id:109, title:'Machine maintenance', city:'Surat', budget:7000, daysRequired:'1 day', hoursRequired:'6-8 hrs', category:'Machine operator', description:'Routine maintenance and checks', phone:'+919812345009' },
  { id:110, title:'Daily house cleaning', city:'Mumbai', budget:1500, daysRequired:'Weekly (4 days)', hoursRequired:'3 hrs/day', category:'Housemaid', description:'Regular cleaning & dusting', phone:'+919812345010' }
];

/* ---------- DOM refs ---------- */
const categoryGrid = document.getElementById('categoryGrid');
const chipsContainer = document.getElementById('chips');
const searchInput = document.getElementById('searchInput');
const cityInput = document.getElementById('cityInput');
const radiusSelect = document.getElementById('radiusSelect');
const workerList = document.getElementById('workerList');
const jobList = document.getElementById('jobList');
const workersCount = document.getElementById('workersCount');
const jobsCount = document.getElementById('jobsCount');

const detailModal = document.getElementById('detailModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const rechargeModal = document.getElementById('rechargeModal');
const rechargeClose = document.getElementById('rechargeClose');
const pay100 = document.getElementById('pay100');
const pay200 = document.getElementById('pay200');

/* ---------- Helpers ---------- */
function makeChip(cat){
  const btn = document.createElement('button');
  btn.className = 'chip';
  btn.textContent = cat;
  btn.dataset.cat = cat;
  btn.onclick = () => {
    btn.classList.toggle('selected');
    renderAll();
  };
  return btn;
}

function createTile(item){
  const div = document.createElement('div');
  div.className = 'card-tile';
  div.tabIndex = 0;
  div.innerHTML = `
    <div class="icon-wrap">${ICONS[item.key] || ICONS['mason']}</div>
    <div class="tile-meta">
      <div class="title">${item.name}</div>
      <div class="sub">${item.category}</div>
    </div>
  `;
  // click toggles selection
  div.addEventListener('click', ()=>{ div.classList.toggle('selected'); renderAll(); });
  return div;
}

/* ---------- Render category grid & chips ---------- */
function renderChips(){
  const cats = [...new Set(jobTypes.map(j=>j.category))];
  chipsContainer.innerHTML = '';
  cats.forEach(c => chipsContainer.appendChild(makeChip(c)));
}

function renderCategoryGrid(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const selectedCats = Array.from(chipsContainer.children).filter(c=>c.classList.contains('selected')).map(c=>c.dataset.cat);

  categoryGrid.innerHTML = '';
  const filtered = jobTypes.filter(j => {
    const matchQ = q ? j.name.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) : true;
    const matchCat = selectedCats.length ? selectedCats.includes(j.category) : true;
    return matchQ && matchCat;
  });

  filtered.forEach(item => categoryGrid.appendChild(createTile(item)));
  if(filtered.length === 0){
    const empty = document.createElement('div');
    empty.style.gridColumn = '1 / -1';
    empty.style.textAlign = 'center';
    empty.style.color = 'var(--muted)';
    empty.textContent = 'No categories matched.';
    categoryGrid.appendChild(empty);
  }
}

/* ---------- Render lists ---------- */
function renderLists(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const cityQ = (cityInput.value || '').trim().toLowerCase();
  const selectedCats = Array.from(chipsContainer.children).filter(c=>c.classList.contains('selected')).map(c=>c.dataset.cat);

  // Workers filter
  const filteredWorkers = demoWorkers.filter(w => {
    const matchQ = q ? (w.name.toLowerCase().includes(q) || w.trade.toLowerCase().includes(q)) : true;
    const matchCity = cityQ ? w.city.toLowerCase().includes(cityQ) : true;
    const matchCat = selectedCats.length ? selectedCats.some(cat => jobTypes.filter(j=>j.category===cat).some(j=> w.trade.toLowerCase().includes(j.name.split(' ')[0].toLowerCase()) || j.name.toLowerCase() === w.trade.toLowerCase())) : true;
    return matchQ && matchCity && matchCat;
  });

  // Jobs filter
  const filteredJobs = demoJobs.filter(j => {
    const matchQ = q ? (j.title.toLowerCase().includes(q) || j.category.toLowerCase().includes(q)) : true;
    const matchCity = cityQ ? j.city.toLowerCase().includes(cityQ) : true;
    const matchCat = selectedCats.length ? selectedCats.includes(j.category) : true;
    return matchQ && matchCity && matchCat;
  });

  // populate workerList
  workerList.innerHTML = '';
  filteredWorkers.forEach(w => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <div class="avatar">${w.name.split(' ')[0].charAt(0)}</div>
      <div class="item-info">
        <div class="item-top">
          <div style="font-weight:700">${w.name}</div>
          <div style="font-weight:800;color:#08203a">₹${w.pricePerDay}/day</div>
        </div>
        <div class="item-sub">${w.trade} · ${w.city}</div>
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
          <div class="badge">${w.daysAvailable}</div>
          <div class="badge">${w.hours}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${w.experience} yrs · ${w.completed} jobs</div>
        </div>
      </div>
    `;
    div.addEventListener('click', ()=>openDetail('worker', w));
    workerList.appendChild(div);
  });

  // populate jobList
  jobList.innerHTML = '';
  filteredJobs.forEach(j => {
    const div = document.createElement('div');
    div.className = 'list-item';
    div.innerHTML = `
      <div class="avatar">${j.title.split(' ')[0].charAt(0)}</div>
      <div class="item-info">
        <div class="item-top">
          <div style="font-weight:700">${j.title}</div>
          <div style="font-weight:800;color:#08203a">₹${j.budget}</div>
        </div>
        <div class="item-sub">${j.category} · ${j.city}</div>
        <div style="margin-top:8px;display:flex;gap:8px;align-items:center">
          <div class="badge">${j.daysRequired}</div>
          <div class="badge">${j.hoursRequired}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${j.description}</div>
        </div>
      </div>
    `;
    div.addEventListener('click', ()=>openDetail('job', j));
    jobList.appendChild(div);
  });

  workersCount.textContent = filteredWorkers.length;
  jobsCount.textContent = filteredJobs.length;
}

/* ---------- Modal for details (worker or job) ---------- */
function openDetail(type, data){
  detailModal.setAttribute('aria-hidden', 'false');
  modalBody.innerHTML = '';
  if(type === 'worker'){
    modalBody.innerHTML = `
      <h2>${data.name}</h2>
      <div style="color:var(--muted);margin-bottom:8px">${data.trade} · ${data.city}</div>
      <div style="display:flex;gap:12px;margin-bottom:10px">
        <div class="badge">₹${data.pricePerDay}/day</div>
        <div class="badge">${data.daysAvailable}</div>
        <div class="badge">${data.hours}</div>
        <div style="margin-left:auto;color:var(--muted)">${data.experience} yrs · ${data.completed} jobs</div>
      </div>
      <p style="margin:8px 0 12px">Contact to discuss availability, scope & schedule.</p>
      <div style="display:flex;gap:10px">
        <button class="btn primary" id="chatBtn">WhatsApp Chat</button>
        <button class="btn" id="hireBtn">Request Quote</button>
      </div>
    `;
    document.getElementById('chatBtn').addEventListener('click', ()=>beginChat(data.phone, data.name));
    document.getElementById('hireBtn').addEventListener('click', ()=>alert('Quote requested (demo).'));
  } else {
    modalBody.innerHTML = `
      <h2>${data.title}</h2>
      <div style="color:var(--muted);margin-bottom:8px">${data.category} · ${data.city}</div>
      <div style="display:flex;gap:12px;margin-bottom:10px">
        <div class="badge">₹${data.budget}</div>
        <div class="badge">${data.daysRequired}</div>
        <div class="badge">${data.hoursRequired}</div>
      </div>
      <p style="margin:8px 0 12px">${data.description}</p>
      <div style="display:flex;gap:10px">
        <button class="btn primary" id="chatBtnJob">WhatsApp Chat</button>
        <button class="btn" id="bidBtn">Place Bid</button>
      </div>
    `;
    document.getElementById('chatBtnJob').addEventListener('click', ()=>beginChat(data.phone, data.title));
    document.getElementById('bidBtn').addEventListener('click', ()=>alert('Bid submitted (demo).'));
  }
}

/* ---------- Chat gating / mock recharge ---------- */
function userHasCredits(){
  const credits = Number(localStorage.getItem('labourconnect_credits') || 0);
  return credits >= 100; // minimum required
}

function beginChat(phone, display){
  // phone must be in international format w/o spaces; demo dataset uses +91...
  if(userHasCredits()){
    // open wa.me link in new tab - prefill text
    const text = encodeURIComponent(`Hi ${display}, I'm contacting you via LabourConnect demo.`);
    const phoneNormalized = phone.replace(/\s+/g,'').replace(/^\+/, '');
    window.open(`https://wa.me/${phoneNormalized}?text=${text}`, '_blank');
    return;
  }
  // open recharge modal
  rechargeModal.setAttribute('aria-hidden','false');
  // after recharge, we will allow chat
  // store "pendingChat" to continue after pay
  localStorage.setItem('pendingChat', JSON.stringify({ phone, display }));
}

function processMockPayment(amount){
  // pretend payment processing and credit user's account
  const current = Number(localStorage.getItem('labourconnect_credits') || 0);
  const newTotal = current + amount;
  localStorage.setItem('labourconnect_credits', newTotal);
  // flash a notification
  alert(`Mock payment of ₹${amount} successful. Balance: ₹${newTotal}.`);
  rechargeModal.setAttribute('aria-hidden','true');

  // if a pendingChat exists, open it
  const pending = JSON.parse(localStorage.getItem('pendingChat') || 'null');
  if(pending){
    localStorage.removeItem('pendingChat');
    beginChat(pending.phone, pending.display);
  }
}

/* ---------- Wire modal close buttons ---------- */
modalClose.addEventListener('click', ()=>detailModal.setAttribute('aria-hidden','true'));
rechargeClose.addEventListener('click', ()=>rechargeModal.setAttribute('aria-hidden','true'));

/* pay handlers */
pay100.addEventListener('click', ()=>processMockPayment(100));
pay200.addEventListener('click', ()=>processMockPayment(200));

/* ---------- Open modal on ESC ---------- */
document.addEventListener('keydown', (e)=>{
  if(e.key === 'Escape'){
    detailModal.setAttribute('aria-hidden','true');
    rechargeModal.setAttribute('aria-hidden','true');
  }
});

/* ---------- Initial render ---------- */
function renderAll(){
  renderCategoryGrid();
  renderLists();
}

/* renderCategoryGrid defined here */
function renderCategoryGrid(){
  const q = (searchInput.value || '').trim().toLowerCase();
  const selectedCats = Array.from(chipsContainer.children).filter(c=>c.classList.contains('selected')).map(c=>c.dataset.cat);
  categoryGrid.innerHTML = '';

  const filtered = jobTypes.filter(j => {
    const matchQ = q ? j.name.toLowerCase().includes(q) || j.category.toLowerCase().includes(q) : true;
    const matchCat = selectedCats.length ? selectedCats.includes(j.category) : true;
    return matchQ && matchCat;
  });

  filtered.forEach(item => {
    const tile = document.createElement('div');
    tile.className = 'card-tile';
    tile.innerHTML = `<div class="icon-wrap">${ICONS[item.key] || ICONS['mason']}</div><div class="tile-meta"><div class="title">${item.name}</div><div class="sub">${item.category}</div></div>`;
    tile.addEventListener('click', ()=>{ tile.classList.toggle('selected'); renderAll(); });
    categoryGrid.appendChild(tile);
  });

  if(filtered.length === 0){
    const empty = document.createElement('div');
    empty.style.gridColumn = '1 / -1';
    empty.style.textAlign = 'center';
    empty.style.color = 'var(--muted)';
    empty.textContent = 'No categories matched.';
    categoryGrid.appendChild(empty);
  }
}

/* ---------- startup ---------- */
renderChips();
renderAll();

/* wire search inputs */
searchInput.addEventListener('input', renderAll);
cityInput.addEventListener('input', renderAll);
radiusSelect.addEventListener('change', renderAll);

/* helpful dev exposure */
window.DEMO = { jobTypes, demoWorkers, demoJobs };
