/* app.js — shared UI behaviors: rendering, chips, filters, modals */

/* --- Helpers --- */
function $(sel) { return document.querySelector(sel); }
function create(tag, attrs, html){ const el = document.createElement(tag); if(attrs) Object.assign(el, attrs); if(html) el.innerHTML = html; return el; }

/* --- Category Tiles renderer (used on index & categories) --- */
function renderCategoryTiles(container, categories, opts={}) {
  if(!container) return;
  container.innerHTML = '';
  categories.forEach(c=>{
    const tile = create('div', {className:'tile'});
    tile.innerHTML = `
      <div class="icon">${getIconMarkup(c.key)}</div>
      <div class="meta">
        <div class="title">${c.name}</div>
        <div class="sub">${c.category}</div>
      </div>
    `;
    tile.addEventListener('click', ()=>{
      // on click navigate to workers page with category filter via URL hash param
      const target = opts.large ? 'categories.html' : 'workers.html';
      // store last clicked category to sessionStorage so the destination reads it
      sessionStorage.setItem('labour_selected_category', c.name);
      window.location = target;
    });
    container.appendChild(tile);
  });
}

/* --- Icon lookup: uses icons.svg symbol ids --- */
function getIconMarkup(key){
  // Use <svg><use xlink:href=...> pattern
  return `<svg width="36" height="36" viewBox="0 0 24 24"><use href="#icon-${key}"></use></svg>`;
}

/* --- Chips component --- */
function createChips(container){
  if(!container) return;
  container.innerHTML = '';
  // categories grouped by category field
  const groups = Array.from(new Set(categories.map(c => c.category)));
  groups.forEach(group=>{
    const chip = create('button', {className:'chip'}, group);
    chip.addEventListener('click', ()=>{
      chip.classList.toggle('active');
      // emit event to let pages re-render
      document.dispatchEvent(new CustomEvent('chip-change'));
    });
    container.appendChild(chip);
  });
}

/* --- Read active filters from chips & inputs (shared) --- */
function getActiveFilters(){
  const activeChips = Array.from(document.querySelectorAll('.chip.active')).map(c=>c.innerText);
  // search inputs may be present on page; collect any sensible ones
  const searchInput = document.querySelector('input[placeholder*="Search"]')?.value?.trim() || '';
  const cityInput = document.querySelector('input[placeholder*="City"]')?.value?.trim() || '';
  const radius = document.querySelector('select#workerRadius, select#jobRadius, select#radius')?.value || '';
  const budget = document.querySelector('#jobBudget')?.value || '';
  return { activeChips, searchInput, cityInput, radius, budget };
}

/* --- Render workers list into a container --- */
function renderWorkers(container, data, filters){
  if(!container) return;
  filters = filters || getActiveFilters();
  const q = (filters.searchInput || '').toLowerCase();
  const city = (filters.cityInput || '').toLowerCase();
  const cats = filters.activeChips || [];

  const filtered = data.filter(w => {
    const matchQ = !q || w.name.toLowerCase().includes(q) || w.trade.toLowerCase().includes(q);
    const matchCity = !city || w.city.toLowerCase().includes(city);
    const matchCat = cats.length === 0 || cats.includes(getCategoryForTrade(w.trade));
    return matchQ && matchCity && matchCat;
  });

  container.innerHTML = '';
  if(filtered.length === 0){
    container.innerHTML = `<div style="padding:18px;color:var(--muted)">No workers match your filters.</div>`;
    return;
  }

  filtered.forEach(w => {
    const card = create('div', {className:'card'});
    card.innerHTML = `
      <div class="avatar">${w.name.charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${w.name}</div>
          <div class="price">₹${w.pricePerDay}/day</div>
        </div>
        <div style="font-size:13px;color:var(--muted)">${w.trade} · ${w.city}</div>
        <div class="row">
          <div class="badge">${w.daysAvailable}</div>
          <div class="badge">${w.hours}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${w.experience} yrs · ${w.completed} jobs</div>
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
    const matchQ = !q || j.title.toLowerCase().includes(q) || j.category.toLowerCase().includes(q);
    const matchCity = !city || j.city.toLowerCase().includes(city);
    const matchCat = cats.length === 0 || cats.includes(j.category);
    const matchBudget = !budgetLimit || j.budget <= budgetLimit;
    return matchQ && matchCity && matchCat && matchBudget;
  });

  container.innerHTML = '';
  if(filtered.length === 0){
    container.innerHTML = `<div style="padding:18px;color:var(--muted)">No jobs match your filters.</div>`;
    return;
  }

  filtered.forEach(j => {
    const card = create('div', {className:'card'});
    card.innerHTML = `
      <div class="avatar">${j.title.charAt(0)}</div>
      <div class="info">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="font-weight:700">${j.title}</div>
          <div class="price">₹${j.budget}</div>
        </div>
        <div style="font-size:13px;color:var(--muted)">${j.category} · ${j.city}</div>
        <div class="row">
          <div class="badge">${j.daysRequired}</div>
          <div class="badge">${j.hoursRequired}</div>
          <div style="margin-left:auto;color:var(--muted);font-size:13px">${truncate(j.description, 90)}</div>
        </div>
      </div>
    `;
    card.addEventListener('click', ()=> showJobModal(j));
    container.appendChild(card);
  });
}

/* --- small utilities --- */
function truncate(str, n){ return str.length>n ? str.slice(0,n-1)+'…' : str; }
function getCategoryForTrade(trade){
  // map trade names to categories via categories data
  const entry = categories.find(c => c.name.toLowerCase().startsWith(trade.toLowerCase().split(' ')[0]) || c.name.toLowerCase() === trade.toLowerCase());
  return entry ? entry.category : (categories[0] && categories[0].category);
}

/* --- Modals --- */
function showWorkerModal(w){
  const backdrop = create('div', {className:'modal-backdrop'});
  const modal = create('div', {className:'modal'});
  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div style="display:flex; gap:12px; align-items:center;">
        <div style="width:56px;height:56px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:700;background:linear-gradient(180deg, rgba(37,99,235,0.06), rgba(37,99,235,0.02)); color:var(--accent)">${w.name.charAt(0)}</div>
        <div>
          <div style="font-weight:700">${w.name}</div>
          <div style="color:var(--muted)">${w.trade} · ${w.city}</div>
        </div>
      </div>
      <div class="price">₹${w.pricePerDay}/day</div>
    </div>
    <div style="margin-top:12px;color:var(--muted)">${w.experience} yrs experience · ${w.completed} jobs completed</div>
    <div style="margin-top:12px">
      <button id="closeModal" class="chip">Close</button>
    </div>
  `;
  backdrop.appendChild(modal);
  backdrop.addEventListener('click', e => { if(e.target === backdrop) backdrop.remove(); });
  modal.querySelector('#closeModal').addEventListener('click', ()=> backdrop.remove());
  document.body.appendChild(backdrop);
}

function showJobModal(j){
  const backdrop = create('div', {className:'modal-backdrop'});
  const modal = create('div', {className:'modal'});
  modal.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
      <div>
        <div style="font-weight:700">${j.title}</div>
        <div style="color:var(--muted)">${j.category} · ${j.city}</div>
      </div>
      <div class="price">₹${j.budget}</div>
    </div>
    <div style="margin-top:12px">
      <div style="font-weight:600">Timeline</div>
      <div style="color:var(--muted); margin-top:6px">${j.daysRequired} · ${j.hoursRequired}</div>
    </div>
    <div style="margin-top:12px">
      <div style="font-weight:600">Description</div>
      <div style="color:var(--muted); margin-top:6px">${j.description}</div>
    </div>
    <div style="margin-top:12px; text-align:right">
      <button id="closeJobModal" class="chip">Close</button>
    </div>
  `;
  backdrop.appendChild(modal);
  modal.querySelector('#closeJobModal').addEventListener('click', ()=> backdrop.remove());
  backdrop.addEventListener('click', e => { if(e.target === backdrop) backdrop.remove(); });
  document.body.appendChild(backdrop);
}

/* export functions (so pages can call) */
window.renderCategoryTiles = renderCategoryTiles;
window.createChips = createChips;
window.getActiveFilters = getActiveFilters;
window.renderWorkers = renderWorkers;
window.renderJobs = renderJobs;
window.categories = window.categories || [];
