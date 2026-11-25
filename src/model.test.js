import test from 'node:test';
import assert from 'node:assert/strict';
import {daysUntil,filterEntries,validateEntry,readEntries,toCSV} from './model.js';
const entry={id:'1',company:'Example',role:'React intern',status:'Saved',mode:'Remote',stipend:'5000',notes:'Follow up',skills:'CSS',url:''};
test('deadlines compare calendar dates including month boundaries',()=>{assert.equal(daysUntil('2026-12-01',new Date(2026,10,30,23,59)),1);assert.equal(daysUntil('2026-11-29',new Date(2026,10,30)), -1);assert.equal(daysUntil(''),null)});
test('search combines with status and location filters',()=>{assert.equal(filterEntries([entry],'react','Saved','Remote').length,1);assert.equal(filterEntries([entry],'react','Applied','Remote').length,0);assert.equal(filterEntries([entry],'follow','All','All').length,1)});
test('rejects unsafe URLs and invalid fields',()=>{assert.equal(validateEntry(entry),'');assert.ok(validateEntry({...entry,url:'javascript:alert(1)'}));assert.ok(validateEntry({...entry,company:' '}));assert.ok(validateEntry({...entry,stipend:-1}))});
test('storage round trip and malformed data',()=>{assert.deepEqual(readEntries({getItem:()=>JSON.stringify([entry])}),[entry]);assert.throws(()=>readEntries({getItem:()=>'{bad'}));assert.throws(()=>readEntries({getItem:()=>JSON.stringify([{}])}))});
test('CSV escapes commas, quotes, newlines and formula prefixes',()=>{const csv=toCSV([{...entry,company:'=HYPERLINK("bad")',notes:'a,b\nc'}]);assert.ok(csv.includes('"\'=HYPERLINK(""bad"")"'));assert.ok(csv.includes('"a,b\nc"'))});
