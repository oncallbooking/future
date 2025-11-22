/* ===========================================================
   FINAL PRODUCTION VERSION — app.js
   Fully integrated version for your 10-page labour booking app
   =========================================================== */

/* ---------- DOM Helpers ---------- */
function $(s) { return document.querySelector(s); }
function create(tag, attrs, html) {
  const el = document.createElement(tag);
  if (attrs) Object.assign(el, attrs);
  if (html) el.innerHTML = html;
  return el;
}

/* ---------- Load Saved Data ---------- */
function loadPersisted() {
  try {
    const w = localStorage.getItem("lc_workers");
    const j = localStorage.getItem("lc_jobs");
    if (w) window.demoWorkers = JSON.parse(w);
    if (j) window.demoJobs = JSON.parse(j);
  } catch (e) {
    console.log("storage load error", e);
  }
}
loadPersisted();

/* ---------- Save Data ---------- */
function saveAll() {
  localStorage.setItem("lc_workers", JSON.stringify(demoWorkers));
  localStorage.setItem("lc_jobs", JSON.stringify(demoJobs));
  document.dispatchEvent(new CustomEvent("data-updated"));
}

/* ---------- Category Tiles ---------- */
function renderCategoryTiles(container, cats, opts = {}) {
  if (!container) return;
  container.innerHTML = "";

  cats.forEach(c => {
    const tile = create("div", { className: "tile" });
    tile.innerHTML = `
      <div class="icon">
        <svg width="36" height="36" viewBox="0 0 24 24">
          <use href="#icon-${c.key}"></use>
        </svg>
      </div>
      <div>
        <div class="title">${c.name}</div>
        <div class="sub">${c.category}</div>
      </div>
    `;

    tile.addEventListener("click", () => {
      sessionStorage.setItem("selectedCategory", c.name);
      // by design, category tile redirects to workers
      window.location = opts.redirect || "workers.html";
    });

    container.appendChild(tile);
  });
}

/* ---------- Chips ---------- */
function createChips(container) {
  if (!container) return;
  container.innerHTML = "";

  const groups = [...new Set(categories.map(c => c.category))];

  groups.forEach(g => {
    const chip = create("button", { className: "chip" }, g);
    chip.addEventListener("click", () => {
      chip.classList.toggle("active");
      document.dispatchEvent(new CustomEvent("chips-updated"));
    });
    container.appendChild(chip);
  });
}

/* ---------- Filters ---------- */
function getFilters() {
  const search = $("#searchInput")?.value.toLowerCase() || "";
  const city = $("#cityInput")?.value.toLowerCase() || "";
  const activeCats = [...document.querySelectorAll(".chip.active")].map(c => c.innerText);
  return { search, city, activeCats };
}

/* ---------- Render Workers ---------- */
function renderWorkers(container, data, f = getFilters()) {
  if (!container) return;
  container.innerHTML = "";

  const list = data.filter(w => {
    const s = w.name.toLowerCase().includes(f.search) ||
              w.trade.toLowerCase().includes(f.search);
    const c = !f.city || w.city.toLowerCase().includes(f.city);
    const g = f.activeCats.length === 0 || f.activeCats.includes(w.category);
    return s && c && g;
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="muted">No technicians found.</div>`;
    return;
  }

  list.forEach(w => {
    const card = create("div", { className: "card worker-card" });
    card.innerHTML = `
      <div class="avatar">${w.name.charAt(0)}</div>
      <div class="info">
        <div class="top">
          <strong>${w.name}</strong>
          <span class="price">₹${w.pricePerDay}/day</span>
        </div>
        <div class="meta">${w.trade} • ${w.city}</div>
        <div class="row">
          <span class="badge">${w.daysAvailable}</span>
          <span class="badge">${w.hours}</span>
          <span class="right muted">${w.experience} yrs • ${w.completed} jobs</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => showWorkerModal(w));
    container.appendChild(card);
  });
}

/* ---------- Render Jobs ---------- */
function renderJobs(container, data, f = getFilters()) {
  if (!container) return;
  container.innerHTML = "";

  const list = data.filter(j => {
    const s = j.title.toLowerCase().includes(f.search) ||
              j.category.toLowerCase().includes(f.search);
    const c = !f.city || j.city.toLowerCase().includes(f.city);
    const g = f.activeCats.length === 0 || f.activeCats.includes(j.category);
    return s && c && g;
  });

  if (list.length === 0) {
    container.innerHTML = `<div class="muted">No job posts found.</div>`;
    return;
  }

  list.forEach(j => {
    const card = create("div", { className: "card job-card" });
    card.innerHTML = `
      <div class="avatar">${j.title.charAt(0)}</div>
      <div class="info">
        <div class="top">
          <strong>${j.title}</strong>
          <span class="price">₹${j.budget}</span>
        </div>
        <div class="meta">${j.category} • ${j.city}</div>
        <div class="row">
          <span class="badge">${j.daysRequired}</span>
          <span class="badge">${j.hoursRequired}</span>
        </div>
      </div>
    `;
    card.addEventListener("click", () => showJobModal(j));
    container.appendChild(card);
  });
}

/* ---------- Add Worker / Job ---------- */
function addWorker(t) {
  demoWorkers.unshift(t);
  saveAll();
}

function addJob(j) {
  demoJobs.unshift(j);
  saveAll();
}

/* ---------- Modals ---------- */
function showWorkerModal(w) {
  const bg = create("div", { className: "modal-backdrop" });
  const m = create("div", { className: "modal" });

  m.innerHTML = `
    <h3>${w.name}</h3>
    <p>${w.trade} — ${w.city}</p>
    <p class="muted">${w.bio || ""}</p>
    <p><strong>₹${w.pricePerDay}/day</strong></p>
    <button class="btn" id="contact">Contact</button>
    <button class="btn ghost" id="close">Close</button>
  `;

  bg.appendChild(m);
  document.body.appendChild(bg);

  $("#close").onclick = () => bg.remove();
  $("#contact").onclick = () => alert("Contact: " + (w.phone || "N/A"));
  bg.onclick = e => { if (e.target === bg) bg.remove(); };
}

function showJobModal(j) {
  const bg = create("div", { className: "modal-backdrop" });
  const m = create("div", { className: "modal" });

  m.innerHTML = `
    <h3>${j.title}</h3>
    <p>${j.category} — ${j.city}</p>
    <p class="muted">${j.description}</p>
    <p><strong>₹${j.budget}</strong></p>
    <button class="btn" id="apply">Apply</button>
    <button class="btn ghost" id="close">Close</button>
  `;

  bg.appendChild(m);
  document.body.appendChild(bg);

  $("#close").onclick = () => bg.remove();
  $("#apply").onclick = () => alert("Application submitted (demo)");
  bg.onclick = e => { if (e.target === bg) bg.remove(); };
}

/* ---------- Subscription Popup ---------- */
let popupShown = false;
function showSubscriptionPopup() {
  if (popupShown) return;
  popupShown = true;

  const box = create("div", { className: "sub-popup" });
  box.innerHTML = `
    <div class="head">Upgrade to Pro</div>
    <div class="body">Unlock unlimited job posts & technicians.</div>
    <div class="actions">
      <button class="btn ghost" id="later">Later</button>
      <button class="btn" id="go">Subscribe</button>
    </div>
  `;
  document.body.appendChild(box);

  $("#later").onclick = () => box.remove();
  $("#go").onclick = () => (window.location = "payment.html");
}

/* ---------- Dashboard Rendering ---------- */
function renderDashboard() {
  const wList = $("#dashTechList");
  const jList = $("#dashJobList");

  if (wList) renderWorkers(wList, demoWorkers, {});
  if (jList) renderJobs(jList, demoJobs, {});
}

document.addEventListener("data-updated", renderDashboard);

/* ---------- Expose Global ---------- */
window.renderCategoryTiles = renderCategoryTiles;
window.createChips = createChips;
window.renderWorkers = renderWorkers;
window.renderJobs = renderJobs;
window.showSubscriptionPopup = showSubscriptionPopup;
window.addWorker = addWorker;
window.addJob = addJob;
window.renderDashboard = renderDashboard;
