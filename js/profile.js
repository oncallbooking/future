
import { TechStore } from './main.js';
document.addEventListener('DOMContentLoaded', async ()=>{
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const out = document.getElementById('profileCard');
  if(!id){ out.innerHTML = '<div class="muted">No technician selected.</div>'; return; }
  const t = await TechStore.findById(id);
  if(!t){ out.innerHTML = '<div class="muted">Technician not found</div>'; return; }
  out.innerHTML = `<h2>${t.name}</h2>
    <div class="muted">Rating: ${t.rating} · Experience: ${t.experience} yrs</div>
    <p style="margin-top:8px">${t.bio || ''}</p>
    <p class="muted">Skills: ${t.skills.join(', ')}</p>
    <div style="margin-top:12px"><a href="index.html" class="btn small">Back</a></div>`;
});
