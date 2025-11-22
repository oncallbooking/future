/* ===========================================================
   FINAL PRODUCTION VERSION — app.js (100% WORKING)
=========================================================== */

function $(s) { return document.querySelector(s); }
function create(tag, props = {}, html = "") {
  const el = document.createElement(tag);
  Object.assign(el, props);
  el.innerHTML = html;
  return el;
}

/* ---------- LOCAL STORAGE LOAD ---------- */
(function initLocalData() {
  const w = localStorage.getItem("workers");
  const j = localStorage.getItem("jobs");
  if (w) window.demoWorkers = JSON.parse(w);
  if (j) window.demoJobs = JSON.parse(j);
})();

/* ---------- SAVE ---------- */
function saveAll() {
  localStorage.setItem("workers", JSON.stringify(window.demoWorkers));
  localStorage.setItem("jobs", JSON.stringify(window.demoJobs));
}

/* ---------- CATEGORY TILES ---------- */
function renderCategoryTiles() {
  const box = $("#categoryBox");
  if (!box) return;
  box.innerHTML = "";

  categories.forEach(c => {
    const t = create("div", { className: "cat-tile" });
    t.innerHTML = `
      <div class="icon"></div>
      <h4>${c.name}</h4>
      <p>${c.category}</p>
    `;
    t.onclick = () => {
      sessionStorage.setItem("category", c.category);
      window.location = "workers.html";
    };
    box.appendChild(t);
  });
}

/* ---------- FILTER VALUES ---------- */
function getFilters() {
  return {
    search: ($("#searchInput")?.value || "").toLowerCase(),
    city: ($("#cityInput")?.value || "").toLowerCase(),
    category: sessionStorage.getItem("category") || ""
  };
}

/* ---------- RENDER WORKERS ---------- */
function renderWorkers() {
  const box = $("#workersList");
  if (!box) return;

  const f = getFilters();
  box.innerHTML = "";

  let list = demoWorkers.filter(w =>
    (w.name.toLowerCase().includes(f.search) ||
     w.trade.toLowerCase().includes(f.search)) &&
    (!f.city || w.city.toLowerCase().includes(f.city)) &&
    (!f.category || w.category === f.category)
  );

  if (!list.length) {
    box.innerHTML = "<p class='empty'>No technicians found.</p>";
    return;
  }

  list.forEach(w => {
    const c = create("div", { className: "worker-card" });
    c.innerHTML = `
      <div class="avatar">${w.name.charAt(0)}</div>
      <div class="info">
        <h3>${w.name}</h3>
        <p>${w.trade} • ${w.city}</p>
        <p class="meta">₹${w.pricePerDay} / day • ${w.experience} yrs</p>
      </div>
    `;
    box.appendChild(c);
  });
}

/* ---------- RENDER JOBS ---------- */
function renderJobs() {
  const box = $("#jobsList");
  if (!box) return;

  const f = getFilters();
  box.innerHTML = "";

  let list = demoJobs.filter(j =>
    (j.title.toLowerCase().includes(f.search)) &&
    (!f.city || j.city.toLowerCase().includes(f.city)) &&
    (!f.category || j.category === f.category)
  );

  if (!list.length) {
    box.innerHTML = "<p class='empty'>No jobs found.</p>";
    return;
  }

  list.forEach(j => {
    const c = create("div", { className: "job-card" });
    c.innerHTML = `
      <div class="avatar">${j.title.charAt(0)}</div>
      <div class="info">
        <h3>${j.title}</h3>
        <p>${j.category} • ${j.city}</p>
        <p class="meta">₹${j.budget}</p>
      </div>
    `;
    box.appendChild(c);
  });
}

/* ---------- ADD TECHNICIAN ---------- */
function addTechnician(e) {
  e.preventDefault();
  const t = {
    name: $("#tName").value,
    trade: $("#tTrade").value,
    city: $("#tCity").value,
    pricePerDay: $("#tPrice").value,
    daysAvailable: $("#tDays").value,
    hours: $("#tHours").value,
    experience: $("#tExp").value,
    completed: 0,
    category: $("#tCat").value,
    phone: $("#tPhone").value
  };
  demoWorkers.push(t);
  saveAll();
  alert("Technician Profile Created!");
  window.location = "workers.html";
}

/* ---------- ADD JOB POST ---------- */
function addJob(e) {
  e.preventDefault();
  const j = {
    title: $("#jTitle").value,
    description: $("#jDesc").value,
    category: $("#jCat").value,
    city: $("#jCity").value,
    budget: $("#jBudget").value,
    daysRequired: $("#jDays").value,
    hoursRequired: $("#jHours").value
  };
  demoJobs.push(j);
  saveAll();
  alert("Job Posted Successfully!");
  window.location = "jobs.html";
}

/* ---------- DASHBOARD ---------- */
function fillDashboard() {
  if ($("#dashTechList")) renderWorkers();
  if ($("#dashJobList")) renderJobs();
}

/* ---------- INIT ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderCategoryTiles();
  renderWorkers();
  renderJobs();
  fillDashboard();
});
