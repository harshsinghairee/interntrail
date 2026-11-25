export const STATUSES = ['Saved', 'Applied', 'Interview', 'Offer', 'Closed'];
export const STORAGE_KEY = 'interntrail.v1';
export function daysUntil(date, today = new Date()) {
  if (!date) return null;
  const [y,m,d] = date.split('-').map(Number);
  return Math.round((Date.UTC(y,m-1,d)-Date.UTC(today.getFullYear(),today.getMonth(),today.getDate()))/86400000);
}
export function validateEntry(entry) {
  if (!entry.company?.trim() || !entry.role?.trim()) return 'Company and role are required.';
  if (!STATUSES.includes(entry.status)) return 'Choose a valid status.';
  if (!Number.isFinite(Number(entry.stipend)) || Number(entry.stipend) < 0) return 'Stipend must be zero or greater.';
  if (entry.url) { try { if (!['http:', 'https:'].includes(new URL(entry.url).protocol)) return 'Use an http or https listing URL.'; } catch { return 'Enter a complete listing URL, including https://.'; } }
  return '';
}
export function filterEntries(entries, search, status, mode) {
  const query = search.trim().toLowerCase();
  return entries.filter(e => `${e.company} ${e.role} ${e.skills} ${e.notes}`.toLowerCase().includes(query) && (status === 'All' || e.status === status) && (mode === 'All' || e.mode === mode));
}
export function readEntries(storage) {
  const raw = storage.getItem(STORAGE_KEY);
  if (!raw) return [];
  const data = JSON.parse(raw);
  if (!Array.isArray(data) || data.some(e => !e || typeof e.id !== 'string' || validateEntry(e))) throw new Error('Invalid saved data');
  return data;
}
export function sampleEntries() {
  const date = n => { const d = new Date(); d.setDate(d.getDate()+n); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  return [
    {id:crypto.randomUUID(),company:'Studio North',role:'Frontend Developer Intern',status:'Interview',mode:'Remote',stipend:'12000',deadline:date(3),skills:'React, CSS, JavaScript',notes:'Demo entry: prepare a walkthrough of a React project.',url:'',createdAt:new Date().toISOString()},
    {id:crypto.randomUUID(),company:'Bloom Labs',role:'Web Development Intern',status:'Applied',mode:'Remote',stipend:'8000',deadline:date(6),skills:'HTML, CSS, React',notes:'Demo entry: follow up next week.',url:'',createdAt:new Date().toISOString()},
    {id:crypto.randomUUID(),company:'Orbit Works',role:'UI Engineering Intern',status:'Saved',mode:'Hybrid',stipend:'10000',deadline:date(2),skills:'JavaScript, accessibility',notes:'Demo entry: confirm working hours before applying.',url:'',createdAt:new Date().toISOString()}
  ];
}
export function toCSV(entries) {
  const keys = ['company','role','status','mode','stipend','deadline','skills','notes','url'];
  const cell = value => { let s=String(value??''); if (/^[=+@\-\t\r]/.test(s)) s="'"+s; return '"'+s.replaceAll('"','""')+'"'; };
  return '\uFEFF'+[keys,...entries.map(e=>keys.map(k=>e[k]))].map(row=>row.map(cell).join(',')).join('\r\n');
}
