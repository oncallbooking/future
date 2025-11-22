/* app.js — shared UI behaviours + persistence + subscription popup */

/* --- Helpers --- */
function $(sel){ return document.querySelector(sel); }
function create(tag, attrs, html){ const el = document.createElement(tag); if(attrs) Object.assign(el, attrs); if(html) el.innerHTML = html; return el; }

/* --- Load / Save data helpers (persist to localStorage for demo) --- */
function loadData(){
  // if localStorage has items, use them; otherwise use global arrays from data.js
  try {
    const lw = localStorage.getItem('labour_demo_workers');
    const lj = localStorage.getItem('labour_demo_jobs');
    if(lw) window.demoWorkers = JSON.parse(lw);
    if(lj) window.demoJobs = JSON.parse(lj);
  } catch(e){ console.warn('loadData error', e); }
}
function saveData(){
  try {
    localStorage.setItem('labour_demo_workers', JSON.stringify(window.demoWorkers));
    localStorage.setItem('labour_demo_jobs', JSON.stringify(window.demoJobs));
    // notify listeners
    document.dispatchEvent(new CustomEvent('data-updated'));
  } catch(e){ console.warn('saveData error', e); }
}

/* ensure data arrays exist */
window.demoWorkers = window.demoWorkers || [];
window.demoJobs = window.demoJobs || [];
window.categories = window.categories || [];

/* load persisted if any */
loadData();

/* --- Icon helper (uses icons.svg sprite) --- */
function getIconMarkup(key){
  return `<svg width="36" height="36" viewBox="0 0 24 24"><use href="#icon-${key}"></use></svg>`;
}

/* --- Render categories tiles (home & categories) --- */
function renderCategoryTiles(container, categoriesArr, opts={}) {
  if(!container) return;
  container.innerHTML = '';
  categoriesArr.forEach(c=>{
    const tile = create('div', {className:'tile'});
    tile.innerHTML = `
      <div class="icon">${getIconMarkup(c.key)}</div>
      <div class="meta">
        <div class="title">${c.name}</div>
        <div class="sub" style="color:var(--muted)">${c.category}</div>
      </div>
    `;
    tile.addEventListener('click', ()=>{
      // store selected category and navigate
      sessionStorage.setItem('labour_selected_category', c.name);
      window.location = opts.large ? 'categories.html' : 'workers.html';
    });
    container.appendChild(tile);
  });
}

/* --- Chips component (small groups by category) --- */
function createChips(container){
  if(!container) return;
  container.innerHTML = '';
  const groups = Array.from(new Set(categories.map(c => c.category)));
  groups.forEach(group=>{
    const chip = create('button', {className:'chip'}, group);
    chip.addEventListener('click', ()=>{
      chip.classList.toggle('active');
      document.dispatchEvent(new CustomEvent('chip-change'));
    });
    container.appendChild(chip);
  });
}

/* --- Get active filters (generic) --- */
function getActiveFilters(){
  const activeChips = Array.from(document.querySelectorAll('.chip.active')).map(c=>c.innerText);
  const textInputs = Array.from(document.querySelectorAll('input, textarea')).reduce((acc, el) => {
    const p = el.placeholder || '';
    if(p.toLowerCase().includes('search')) acc.search = el.value.trim();
    if(p.toLowerCase().includes('city')) acc.city = el.value.trim();
    return acc;
  }, {});
  const budgetInput = document.querySelector('#jobBudget, #jobBudget')?.value;
  return { activeChips, searchInput: textInputs.search || '', cityInput: textInputs.city || '', budget: budgetInput || '' };
}

/* --- Render workers list --- */
function renderWorkers(container, data, filters){
  if(!container) return;
  filters = filters || getActiveFilters();
  const q = (filters.searchInput || '').toLowerCase();
  const city = (filters.cityInput || '').toLowerCase();
  const cats = filters.activeChips || [];

  const filtered = data.filter(w => {
    const tradeLow = (w.trade || '').toLowerCase();
    const matchQ = !q || (w.name || '').toLowerCase().includes(q) || tradeLow.includes(q);
    const matchCity = !city || (w.city || '').toLowerCase().includes(city);
    const matchCat = cats.length === 0 || cats.includes(w.category || getCategoryForTrade(w.trade));
    return matchQ && matchCity && matchCat;
  });

  container.innerHTML = '';
  if(filtered.length === 0){
    container.innerHTML = `<div style="padding:18px;color:var(--muted)">No technicians match your filters.</div>`;
    return;
  }

  filtered.forEach(w => {
    const card = create('div', {className:'card'});
    card.innerHTML = `
      <div class="avatar">${(w.name||'U').charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${w.name}</div>
          <div class="price">₹${w.pricePerDay}/day</div>
        </div>
        <div style="font-size:13px;color:var(--muted)">${w.trade} · ${w.city}</div>
        <div class="row">
          <div class="badge">${w.daysAvailable || 'N/A'}</div>
          <div class="badge">${w.hours || 'N/A'}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${w.experience || 0} yrs · ${w.completed || 0} jobs</div>
        </div>
      </div>
    `;
    card.addEventListener('click', ()=> showWorkerModal(w));
    container.appendChild(card);
  });
}

/* --- Render jobs list --- */
function renderJobs(container, data, filters){
  if(!container) return;
  filters = filters || getActiveFilters();
  const q = (filters.searchInput || '').toLowerCase();
  const city = (filters.cityInput || '').toLowerCase();
  const cats = filters.activeChips || [];
  const budgetLimit = Number(filters.budget || 0) || 0;

  const filtered = data.filter(j => {
    const titleLow = (j.title || '').toLowerCase();
    const matchQ = !q || titleLow.includes(q) || (j.category || '').toLowerCase().includes(q);
    const matchCity = !city || (j.city || '').toLowerCase().includes(city);
    const matchCat = cats.length === 0 || cats.includes(j.category);
    const matchBudget = !budgetLimit || (j.budget || 0) <= budgetLimit;
    return matchQ && matchCity && matchCat && matchBudget;
  });

  container.innerHTML = '';
  if(filtered.length === 0){
    container.innerHTML = `<div style="padding:18px;color:var(--muted)">No job posts match your filters.</div>`;
    return;
  }

  filtered.forEach(j => {
    const card = create('div', {className:'card'});
    card.innerHTML = `
      <div class="avatar">${(j.title||'J').charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${j.title}</div>
          <div class="price">₹${j.budget}</div>
        </div>
        <div style="font-size:13px;color:var(--muted)">${j.category} · ${j.city}</div>
        <div class="row">
          <div class="badge">${j.daysRequired || 'N/A'}</div>
          <div class="badge">${j.hoursRequired || 'N/A'}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${truncate(j.description || '', 90)}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', ()=> showJobModal(j));
    container.appendChild(card);
  });
}

/* --- Utilities --- */
function truncate(str, n){ return str && str.length>n ? str.slice(0,n-1)+'…' : (str||''); }
function getCategoryForTrade(trade){
  if(!trade) return categories[0] && categories[0].category;
  const t = trade.toLowerCase();
  const found = categories.find(c => c.name.toLowerCase().startsWith(t.split(' ')[0]) || c.name.toLowerCase() === t);
  return found ? found.category : (categories[0] && categories[0].category);
}

/* --- Add worker/job functions (persist & broadcast update) --- */
function addWorker(tech){
  window.demoWorkers = window.demoWorkers || [];
  window.demoWorkers.unshift(tech);
  saveData();
}
function addJob(job){
  window.demoJobs = window.demoJobs || [];
  window.demoJobs.unshift(job);
  saveData();
}

/* --- Modals for worker & job --- */
function showWorkerModal(w){
  const backdrop = create('div', {className:'modal-backdrop'});
  const modal = create('div', {className:'modal'});
  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; gap:12px; align-items:center;">
        <div style="width:64px;height:64px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(90deg,var(--accent),var(--accent-3)); color:#fff; font-size:20px">${(w.name||'U').charAt(0)}</div>
        <div>
          <div style="font-weight:800; font-size:18px">${w.name}</div>
          <div style="color:var(--muted); margin-top:4px">${w.trade} · ${w.city}</div>
        </div>
      </div>
      <div style="text-align:right">
        <div style="font-weight:700; color:var(--accent)">₹${w.pricePerDay}/day</div>
        <div style="color:var(--muted); font-size:13px">${w.experience} yrs</div>
      </div>
    </div>
    <div style="margin-top:12px; color:var(--muted)">${w.bio || 'No bio provided.'}</div>

    <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end;">
      <button class="btn ghost" id="closeModal">Close</button>
      <button class="btn" id="contactTech">Contact</button>
    </div>
  `;
  backdrop.appendChild(modal);
  modal.querySelector('#closeModal').addEventListener('click', () => backdrop.remove());
  modal.querySelector('#contactTech').addEventListener('click', () => {
    alert(`Contact ${w.name} at ${w.phone || 'N/A'} (demo)`);
  });
  backdrop.addEventListener('click', (e) => { if(e.target === backdrop) backdrop.remove(); });
  document.body.appendChild(backdrop);
}

function showJobModal(j){
  const backdrop = create('div', {className:'modal-backdrop'});
  const modal = create('div', {className:'modal'});
  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-weight:800; font-size:18px">${j.title}</div>
        <div style="color:var(--muted); margin-top:4px">${j.category} · ${j.city}</div>
      </div>
      <div style="text-align:right">
        <div style="font-weight:700; color:var(--accent)">₹${j.budget}</div>
        <div style="color:var(--muted); font-size:13px">${j.daysRequired} · ${j.hoursRequired}</div>
      </div>
    </div>
    <div style="margin-top:12px; color:var(--muted)">${j.description}</div>

    <div style="margin-top:12px; display:flex; gap:8px; justify-content:flex-end;">
      <button class="btn ghost" id="closeJobModal">Close</button>
      <button class="btn" id="applyJob">Apply</button>
    </div>
  `;
  backdrop.appendChild(modal);
  modal.querySelector('#closeJobModal').addEventListener('click', () => backdrop.remove());
  modal.querySelector('#applyJob').addEventListener('click', () => {
    alert('Application simulated (demo).');
  });
  backdrop.addEventListener('click', (e) => { if(e.target === backdrop) backdrop.remove(); });
  document.body.appendChild(backdrop);
}

/* --- Subscription popup --- */
let _subPopupShown = false;
function showSubscriptionPopup(opts = {}){
  if(_subPopupShown) return;
  _subPopupShown = true;
  const popup = create('div', {className:'sub-popup', id:'subPopup'});
  popup.innerHTML = `
    <div class="head">
      <div style="font-weight:700; font-size:15px">Go Pro</div>
      <div style="margin-left:auto; font-size:12px; opacity:0.95">Upgrade</div>
    </div>
    <div class="body">
      <div style="font-weight:700; margin-bottom:6px">${opts.title || 'Subscribe to Pro'}</div>
      <div style="color:var(--muted); font-size:14px">${opts.body || 'Unlock unlimited job posts, priority leads and advanced filters.'}</div>
    </div>
    <div class="actions">
      <button class="btn ghost" id="maybeLater">Maybe later</button>
      <button class="btn" id="subscribeNow">Subscribe now</button>
    </div>
  `;
  document.body.appendChild(popup);

  popup.querySelector('#maybeLater').addEventListener('click', () => { popup.remove(); });
  popup.querySelector('#subscribeNow').addEventListener('click', () => {
    // persist 'wants_sub' flag demo and redirect to payment
    localStorage.setItem('labour_wants_sub', '1');
    window.location = 'payment.html';
  });
}

/* --- Exports --- */
window.renderCategoryTiles = renderCategoryTiles;
window.createChips = createChips;
window.getActiveFilters = getActiveFilters;
window.renderWorkers = renderWorkers;
window.renderJobs = renderJobs;
window.addWorker = addWorker;
window.addJob = addJob;
window.showSubscriptionPopup = showSubscriptionPopup;
