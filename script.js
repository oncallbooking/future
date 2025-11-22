/* ---------- Google Translate init (auto detect + dropdown) ---------- */
function googleTranslateInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    },
    'translate-box'
  );
}

/* ---------- ICONS, jobTypes, demoWorkers, demoJobs ---------- */
/* Paste your full ICONS object here (exact as original) */
const ICONS = {
  /* ... (copy the large ICONS object from your original file) ... */
};
/* Paste your jobTypes array here (exact as original) */
const jobTypes = [
  /* ... (copy the jobTypes array from your original file) ... */
];
/* Paste your demoWorkers here */
const demoWorkers = [
  /* ... (copy demoWorkers) ... */
];
/* Paste your demoJobs here */
const demoJobs = [
  /* ... (copy demoJobs) ... */
];

/* ---------- DOM references ---------- */
const iconGrid = document.getElementById('iconGrid');
const filterChips = document.getElementById('filterChips');
const searchInput = document.getElementById('searchInput');
const cityInput = document.getElementById('cityInput');
const radiusSelect = document.getElementById('radiusSelect');
const workerList = document.getElementById('workerList');
const jobList = document.getElementById('jobList');
const workersCount = document.getElementById('workersCount');
const jobsCount = document.getElementById('jobsCount');
const miniSearch = document.getElementById('miniSearch');
const clearFilters = document.getElementById('clearFilters');
const applyFilters = document.getElementById('applyFilters');

/* ---------- Create category chips from jobTypes unique categories ---------- */
const categories = [...new Set(jobTypes.map(j => j.category))];
categories.forEach(cat=>{
  const el = document.createElement('button');
  el.className = 'tile chip';
  el.style.padding = '8px';
  el.innerHTML = `<div style="font-weight:600">${cat}</div><div style="font-size:12px;color:var(--muted)">${jobTypes.filter(j=>j.category===cat).length} roles</div>`;
  el.onclick = () => { el.classList.toggle('selected'); renderAll(); };
  filterChips.appendChild(el);
});

/* ---------- renderGrid: small square tiles ---------- */
function renderGrid(){
  const q = (searchInput.value || miniSearch.value || '').trim().toLowerCase();
  const cityQ = (cityInput.value || '').trim().toLowerCase();
  const activeCats = Array.from(filterChips.children).filter(c=>c.classList.contains('selected')).map(c=>c.innerText);

  iconGrid.innerHTML = '';
  const filtered = jobTypes.filter(j=>{
    const matchQ = q ? (j.name.toLowerCase().includes(q) || j.category.toLowerCase().includes(q)) : true;
    const matchCat = activeCats.length ? activeCats.includes(j.category) : true;
    const matchCity = cityQ ? (demoWorkers.some(w=>w.city.toLowerCase().includes(cityQ)) || demoJobs.some(job=>job.city.toLowerCase().includes(cityQ))) : true;
    return matchQ && matchCat && matchCity;
  });

  filtered.forEach(item=>{
    const tile = document.createElement('div');
    tile.className = 'tile';
    tile.onclick = () => {
      tile.classList.toggle('selected');
      renderAll();
    };

    const ico = ICONS[item.key] || `<div style="font-size:18px">🔧</div>`;
    tile.innerHTML = `<div class="icon">${ico}</div><div class="title">${item.name}</div><div style="font-size:11px;color:var(--muted)">${item.category}</div>`;
    iconGrid.appendChild(tile);
  });

  if(filtered.length === 0){
    const empty = document.createElement('div');
    empty.style.gridColumn = '1 / -1';
    empty.style.textAlign = 'center';
    empty.style.padding = '18px';
    empty.style.color = 'var(--muted)';
    empty.innerText = 'No categories match your filters.';
    iconGrid.appendChild(empty);
  }
}

/* ---------- renderAll: filters -> workers & jobs ---------- */
function renderAll(){
  renderGrid();

  const q = (searchInput.value || miniSearch.value || '').trim().toLowerCase();
  const cityQ = (cityInput.value || '').trim().toLowerCase();
  const activeCats = Array.from(filterChips.children).filter(c=>c.classList.contains('selected')).map(c=>c.querySelector('div').innerText || c.innerText);

  const filteredWorkers = demoWorkers.filter(w=>{
    const matchCity = cityQ ? w.city.toLowerCase().includes(cityQ) : true;
    const matchQ = q ? (w.name.toLowerCase().includes(q) || w.trade.toLowerCase().includes(q)) : true;
    const matchCat = activeCats.length ? activeCats.some(cat => jobTypes.filter(j=>j.category===cat).some(j=> w.trade.toLowerCase().includes(j.name.split(' ')[0].toLowerCase()) || (j.name.toLowerCase() === w.trade.toLowerCase()))) : true;
    return matchCity && matchQ && matchCat;
  });

  const filteredJobs = demoJobs.filter(job=>{
    const matchCity = cityQ ? job.city.toLowerCase().includes(cityQ) : true;
    const matchQ = q ? (job.title.toLowerCase().includes(q) || job.category.toLowerCase().includes(q)) : true;
    const matchCat = activeCats.length ? activeCats.includes(job.category) : true;
    return matchCity && matchQ && matchCat;
  });

  workerList.innerHTML = '';
  filteredWorkers.forEach(w=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="avatar">${w.name.split(' ')[0].charAt(0)}</div>
      <div class="info">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700">${w.name}</div>
          <div style="font-weight:700">₹${w.pricePerDay}</div>
        </div>
        <div style="color:var(--muted);font-size:13px">${w.trade} · ${w.city}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <div class="badge-small">${w.daysAvailable}</div>
          <div class="badge-small">${w.hours}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${w.experience} yrs · ${w.completed} jobs</div>
        </div>
      </div>`;
    workerList.appendChild(card);
  });

  jobList.innerHTML = '';
  filteredJobs.forEach(j=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="avatar">${j.title.split(' ')[0].charAt(0)}</div>
      <div class="info">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div style="font-weight:700">${j.title}</div>
          <div style="font-weight:700">₹${j.budget}</div>
        </div>
        <div style="color:var(--muted);font-size:13px">${j.category} · ${j.city}</div>
        <div style="display:flex;gap:8px;margin-top:8px">
          <div class="badge-small">${j.daysRequired}</div>
          <div class="badge-small">${j.hoursRequired}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${j.description}</div>
        </div>
      </div>`;
    jobList.appendChild(card);
  });

  workersCount.innerText = filteredWorkers.length;
  jobsCount.innerText = filteredJobs.length;
}

/* ---------- small helpers & events ---------- */
miniSearch.addEventListener('input', ()=> { searchInput.value = miniSearch.value; renderAll(); });
searchInput.addEventListener('input', ()=> { miniSearch.value = searchInput.value; renderAll(); });
cityInput.addEventListener('input', renderAll);
radiusSelect.addEventListener('change', renderAll);

document.getElementById('clearFilters').addEventListener('click', ()=>{
  searchInput.value = miniSearch.value = cityInput.value = '';
  Array.from(filterChips.children).forEach(c=>c.classList.remove('selected'));
  renderAll();
});
document.getElementById('applyFilters').addEventListener('click', renderAll);

/* initial render */
renderAll();

/* Expose for debug */
window._LABOUR = { jobTypes, demoWorkers, demoJobs, ICONS };
