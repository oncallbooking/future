/* data.js — seed data + persistence fallback */

/* seed categories */
window.categories = [
  { key:'mason', name:'Mason (Rajmistri)', category:'Construction' },
  { key:'carpenter', name:'Carpenter', category:'Construction' },
  { key:'electrician', name:'Electrician', category:'Electrical' },
  { key:'plumber', name:'Plumber', category:'Plumbing' },
  { key:'welder', name:'Welder', category:'Fabrication' },
  { key:'tile', name:'Tile / Marble Worker', category:'Finishing' },
  { key:'painter', name:'Painter / POP Technician', category:'Finishing' },
  { key:'barbender', name:'Bar Bender / Steel Fixer', category:'Construction' },
  { key:'scaffolder', name:'Scaffolder', category:'Construction' },
  { key:'machine', name:'Machine operator', category:'Industrial' },
  { key:'housemaid', name:'Housemaid', category:'Domestic' },
  { key:'cleaner', name:'Site cleaner', category:'Support' }
];

/* seed workers */
window.demoWorkers = [
  { id:1, name:'Ramesh Kumar', trade:'Electrician', category:'Electrical', city:'Mumbai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:6, completed:320, phone:'900000001' , bio:'Skilled electrician with residential & commercial experience.' },
  { id:2, name:'Suresh Patel', trade:'Plumber', category:'Plumbing', city:'Ahmedabad', pricePerHour:140, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'8am-5pm', experience:8, completed:210, phone:'900000002', bio:'Specialised in bathroom & kitchen plumbing.' },
  { id:3, name:'Mahesh Singh', trade:'Carpenter', category:'Construction', city:'Delhi', pricePerHour:160, pricePerDay:1250, daysAvailable:'Tue-Sun', hours:'9am-5pm', experience:5, completed:150, phone:'900000003', bio:'Furniture repair and custom cabinetry.' },
  { id:4, name:'Anoop Sharma', trade:'Welder', category:'Fabrication', city:'Bengaluru', pricePerHour:170, pricePerDay:1300, daysAvailable:'Mon-Fri', hours:'10am-6pm', experience:7, completed:400, phone:'900000004', bio:'Gate & structural welding — mobile service.' },
  { id:5, name:'Vikram Rao', trade:'Mason (Rajmistri)', category:'Construction', city:'Hyderabad', pricePerHour:130, pricePerDay:1000, daysAvailable:'Mon-Sat', hours:'7am-4pm', experience:10, completed:510, phone:'900000005', bio:'Plastering and brickwork expert.' },
  { id:6, name:'Kishore', trade:'Tile / Marble Worker', category:'Finishing', city:'Chennai', pricePerHour:150, pricePerDay:1200, daysAvailable:'Mon-Fri', hours:'8am-4pm', experience:4, completed:78, phone:'900000006', bio:'Tile cutting, grouting and leveling.' },
  { id:7, name:'Raju', trade:'Bar Bender', category:'Construction', city:'Pune', pricePerHour:145, pricePerDay:1100, daysAvailable:'Mon-Sat', hours:'9am-5pm', experience:6, completed:200, phone:'900000007', bio:'Rebar tying & reinforcement works.' },
  { id:8, name:'Deepak', trade:'Scaffolder', category:'Construction', city:'Kolkata', pricePerHour:140, pricePerDay:1050, daysAvailable:'Tue-Sun', hours:'8am-4pm', experience:5, completed:90, phone:'900000008', bio:'Scaffold erection & safety compliance.' },
  { id:9, name:'Sandeep', trade:'Machine operator', category:'Industrial', city:'Surat', pricePerHour:155, pricePerDay:1150, daysAvailable:'Mon-Fri', hours:'9am-6pm', experience:9, completed:310, phone:'900000009', bio:'Industrial machine operator & maintenance.' },
  { id:10, name:'Rita', trade:'Housemaid', category:'Domestic', city:'Mumbai', pricePerHour:100, pricePerDay:700, daysAvailable:'Mon-Sun', hours:'8am-2pm', experience:3, completed:600, phone:'900000010', bio:'Housekeeping, cleaning & assistance.' }
];

/* seed jobs */
window.demoJobs = [
  { id:101, title:'Fix home wiring', city:'Mumbai', budget:1500, daysRequired:'1 day', hoursRequired:'3-4 hours', category:'Electrician', description:'Short circuit in hall & some fittings to replace', contactName:'Amit', contactPhone:'900001101' },
  { id:102, title:'Bathroom plumbing', city:'Ahmedabad', budget:3000, daysRequired:'2 days', hoursRequired:'6-8 hours/day', category:'Plumber', description:'Replace piping & fix leak', contactName:'Kiran', contactPhone:'900001102' },
  { id:103, title:'Kitchen cabinets repair', city:'Delhi', budget:2500, daysRequired:'1-2 days', hoursRequired:'5-6 hours', category:'Carpenter', description:'Refix cabinet doors and polish', contactName:'Neha', contactPhone:'900001103' },
  { id:104, title:'Welding gate hinges', city:'Bengaluru', budget:1200, daysRequired:'half day', hoursRequired:'2-3 hours', category:'Welder', description:'Weld two hinges & paint', contactName:'Rohit', contactPhone:'900001104' },
  { id:105, title:'House plastering', city:'Hyderabad', budget:8000, daysRequired:'3 days', hoursRequired:'8 hours/day', category:'Mason (Rajmistri)', description:'Plastering and finishing of small living room', contactName:'Priya', contactPhone:'900001105' },
  { id:106, title:'Tile flooring', city:'Chennai', budget:9000, daysRequired:'2 days', hoursRequired:'8 hours/day', category:'Tile / Marble Worker', description:'Replace kitchen flooring tiles', contactName:'Arun', contactPhone:'900001106' },
  { id:107, title:'Steel reinforcement work', city:'Pune', budget:5000, daysRequired:'2 days', hoursRequired:'6 hours/day', category:'Bar Bender', description:'Fix steel bars for small slab', contactName:'Shweta', contactPhone:'900001107' },
  { id:108, title:'Scaffold setup', city:'Kolkata', budget:4000, daysRequired:'1 day', hoursRequired:'8 hours', category:'Scaffolder', description:'Scaffold for exterior painting', contactName:'Imran', contactPhone:'900001108' },
  { id:109, title:'Machine maintenance', city:'Surat', budget:7000, daysRequired:'1 day', hoursRequired:'6-8 hours', category:'Machine operator', description:'Routine maintenance and checks', contactName:'Sunil', contactPhone:'900001109' },
  { id:110, title:'Daily house cleaning', city:'Mumbai', budget:1500, daysRequired:'Weekly (4 days)', hoursRequired:'3 hours/day', category:'Housemaid', description:'Regular cleaning & dusting for 4 days/week', contactName:'Geeta', contactPhone:'900001110' }
];

/* try to load persisted data (localStorage) to override seeds if present */
(function tryLoadPersist(){
  try {
    const lw = localStorage.getItem('labour_demo_workers');
    const lj = localStorage.getItem('labour_demo_jobs');
    if(lw) window.demoWorkers = JSON.parse(lw);
    if(lj) window.demoJobs = JSON.parse(lj);
  } catch(e){ console.warn('data load error', e); }
})();
