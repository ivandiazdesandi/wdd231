import { isFav, toggleFav } from './favorites.js';
import { openModal } from './modal.js';

export function trailCard(t){
  const favLabel = isFav(t.id) ? '★ Favorite' : '☆ Favorite';
  return `
  <article class="card" data-id="${t.id}">
    <img loading="lazy" src="${t.image}" alt="${t.name} trail photo">
    <div class="p">
      <h3>${t.name}</h3>
      <p class="meta">
        <span class="badge">${t.suburb}</span>
        <span class="badge">${t.distance_km} km</span>
        <span class="badge">${t.difficulty}</span>
      </p>
      <p>${t.description}</p>
      <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-top:.4rem">
        <button class="btn ghost" data-details>Details</button>
        <button class="btn primary" data-fav>${favLabel}</button>
      </div>
    </div>
  </article>`;
}

export function attachCardEvents(container, trails){
  container.querySelectorAll('[data-details]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.currentTarget.closest('.card');
      const id = card.dataset.id;
      const t = trails.find(x=> String(x.id) === String(id));
      openModal(`
        <header><strong>${t.name}</strong></header>
        <div class="content">
          <img src="${t.image}" alt="${t.name}">
          <p><strong>Suburb:</strong> ${t.suburb}</p>
          <p><strong>Distance:</strong> ${t.distance_km} km &middot; <strong>Difficulty:</strong> ${t.difficulty}</p>
          <p><strong>Transport:</strong> ${t.transport}</p>
          <p>${t.long || t.description}</p>
        </div>
        <div class="actions">
          <button class="btn ghost" data-close>Close</button>
        </div>
      `);
    });
  });

  container.querySelectorAll('[data-fav]').forEach(btn=>{
    btn.addEventListener('click', e=>{
      const card = e.currentTarget.closest('.card');
      const id = card.dataset.id;
      const nowFav = toggleFav(id);
      e.currentTarget.textContent = nowFav ? '★ Favorite' : '☆ Favorite';
    });
  });
}