/* data.js — seed data for demo app */

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

window.demoWorkers = [
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

window.demoJobs = [
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
