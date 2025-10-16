import { initNav } from './nav.js';
import { loadTrails } from './trails.js';
import { trailCard, attachCardEvents } from './explore.js';

initNav('/final/index.html'); // wayfinding

const container = document.querySelector('#featured');
const heroSpot  = document.querySelector('#spotlight');

(async () => {
  const trails = await loadTrails();
  if(trails.length === 0){
    container.innerHTML = '<p>Unable to load trails right now.</p>';
    return;
  }

  // pick 6 random for homepage grid
  const shuffled = [...trails].sort(()=> Math.random()-0.5).slice(0,6);
  container.innerHTML = shuffled.map(trailCard).join('');
  attachCardEvents(container, trails);

  // spotlight one trail
  const s = shuffled[0];
  heroSpot.innerHTML = `
    <p class="meta"><span class="badge">${s.suburb}</span> <span class="badge">${s.distance_km} km</span> <span class="badge">${s.difficulty}</span></p>
    <p>${s.description}</p>
    <div><a class="btn ghost" href="explore.html">Browse all trails</a></div>
  `;
})();