
// Minimal main.js providing TechStore and rendering basic UI & seeding demo data
export const TechStore = {
  key: 'futrifix_techs_v1',
  async getAll() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  },
  async addTech(t) {
    const arr = await this.getAll();
    arr.push(t);
    localStorage.setItem(this.key, JSON.stringify(arr));
    window.dispatchEvent(new Event('storage'));
  },
  async findById(id) {
    return (await this.getAll()).find(t=>t.id===id);
  },
  async seedDemo() {
    const demo = [
      {id:'TECH-ALPHA', name:'Arjun Rao', pin:'560001', skills:['EV Repair','Battery'], experience:4, price:700, bio:'EV specialist', rating:'4.5', lat:12.9716, lng:77.5946},
      {id:'TECH-BETA', name:'Priya K', pin:'560002', skills:['AC Repair','Appliance'], experience:6, price:1200, bio:'Senior technician', rating:'4.8', lat:12.975, lng:77.59}
    ];
    localStorage.setItem(this.key, JSON.stringify(demo));
    window.dispatchEvent(new Event('storage'));
  }
};

import { JobStore } from './bid-system.js';

function createTechCard(t){
  const el = document.createElement('div');
  el.className = 'card';
  el.innerHTML = `<strong>${t.name}</strong> <div class="muted">Rating: ${t.rating}</div>
    <div class="muted">Skills: ${t.skills.join(', ')}</div>
    <div style="margin-top:8px">
      <a href="technician.html?id=${t.id}" class="btn small">View Profile</a>
    </div>`;
  return el;
}

async function renderList(filterPin){
  const list = document.getElementById('techList');
  list.innerHTML = '';
  const techs = await TechStore.getAll();
  const filtered = filterPin ? techs.filter(t=>t.pin && t.pin.startsWith(filterPin)) : techs;
  if(filtered.length===0) list.innerHTML = '<div class="muted">No technicians found</div>';
  else filtered.forEach(t=>list.appendChild(createTechCard(t)));
}

async function renderJobs(){
  const feed = document.getElementById('jobFeed');
  if(!feed) return;
  const jobs = await JobStore.getAll();
  feed.innerHTML = jobs.map(j=>`<div class="card"><strong>${j.id}</strong> ${j.category} — ${j.budget} ₹</div>`).join('');
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const seedBtn = document.getElementById('demoSeedBtn');
  const searchBtn = document.getElementById('searchBtn');
  const locationInput = document.getElementById('locationInput');
  seedBtn && seedBtn.addEventListener('click', async ()=>{
    await TechStore.seedDemo();
    await JobStore.seedDemo();
    renderList();
    renderJobs();
    document.getElementById('searchMsg').textContent = 'Demo data seeded.';
  });
  searchBtn && searchBtn.addEventListener('click', ()=> renderList(locationInput.value.trim()));
  await renderList();
  await renderJobs();
  window.addEventListener('storage', ()=>{ renderList(); renderJobs(); });
});

// Export default for other pages
export default TechStore;
