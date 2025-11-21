
// JobStore: simple localStorage-backed job storage and basic API used by client-post and dashboard
export const JobStore = {
  key: 'futrifix_jobs_v1',
  async getAll() {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : [];
  },
  async addJob(j) {
    const arr = await this.getAll();
    arr.push(j);
    localStorage.setItem(this.key, JSON.stringify(arr));
    window.dispatchEvent(new Event('storage'));
  },
  async seedDemo() {
    const demo = [
      {id:'JOB-DEMO1', fullname:'Rohit', pin:'560001', address:'Bangalore', category:'electric', budget:1500, description:'Battery replacement', times:'', photos:[], createdAt:Date.now(), expiresAt:Date.now()+3600000, bids:[], status:'open'}
    ];
    localStorage.setItem(this.key, JSON.stringify(demo));
    window.dispatchEvent(new Event('storage'));
  }
};
