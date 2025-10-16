import { initNav } from './nav.js';
import { loadTrails } from './trails.js';
import { trailCard, attachCardEvents } from './explore.js';

initNav('/final/explore.html');

const list = document.querySelector('#trail-list');
const qInput = document.querySelector('#q');
const diffSel = document.querySelector('#difficulty');
const suburbSel = document.querySelector('#suburb');

let all = [];

function render(){
  const term = qInput.value.trim().toLowerCase();
  const diff = diffSel.value;
  const sub  = suburbSel.value;

  const filtered = all.filter(t=>{
    const okQ = !term || (t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term));
    const okD = diff==='all' || t.difficulty===diff;
    const okS = sub==='all' || t.suburb===sub;
    return okQ && okD && okS;
  });

  list.innerHTML = filtered.map(trailCard).join('');
  attachCardEvents(list, all);
}

(async ()=>{
  all = await loadTrails();
  if(all.length===0){ list.innerHTML = '<p>Unable to load data.</p>'; return; }

  // populate filter dropdowns
  const suburbs = [...new Set(all.map(t=>t.suburb))].sort();
  suburbSel.innerHTML = `<option value="all">All suburbs</option>` + suburbs.map(s=>`<option>${s}</option>`).join('');

  render();
  qInput.addEventListener('input', render);
  diffSel.addEventListener('change', render);
  suburbSel.addEventListener('change', render);
})();