// chamber/scripts/directory.js
const container = document.getElementById('directory');
const btnGrid = document.getElementById('btnGrid');
const btnList = document.getElementById('btnList');

// Works locally and on GitHub Pages
const dataURL = location.hostname.includes('github.io')
  ? 'https://ivandiazdesandi.github.io/wdd231/chamber/data/members.json'
  : 'data/members.json';

document.addEventListener('DOMContentLoaded', () => {
  loadMembers();
});

async function loadMembers() {
  if (!container) return;
  try {
    const res = await fetch(`${dataURL}?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json(); // expecting an array

    // Render and wire buttons
    renderGrid(members);
    if (btnGrid) btnGrid.onclick = () => renderGrid(members);
    if (btnList) btnList.onclick = () => renderList(members);
  } catch (err) {
    console.error('Directory fetch failed:', err);
    container.innerHTML = `<p style="color:#b00020">Could not load member data. ${err.message}</p>`;
  }
}

function renderGrid(members) {
  container.className = 'directory grid';
  container.innerHTML = members.map(m => `
    <article class="card">
      <img src="${safeImg(m.image)}" alt="${esc(m.name)} logo" loading="lazy" width="160" height="160">
      <h3>${esc(m.name)}</h3>
      <p>${esc(m.address)}</p>
      <p>${esc(m.phone)}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Visit website</a>
      <p class="tier tier-${Number(m.membershipLevel) || 1}">
        Membership: ${tierLabel(Number(m.membershipLevel) || 1)}
      </p>
    </article>
  `).join('');
}

function renderList(members) {
  container.className = 'directory list';
  container.innerHTML = `
    <ul class="list-plain">
      ${members.map(m => `
        <li>
          <span class="name">${esc(m.name)}</span>
          <span class="phone">${esc(m.phone)}</span>
          <a href="${m.website}" target="_blank" rel="noopener">${m.website}</a>
        </li>
      `).join('')}
    </ul>
  `;
}

function tierLabel(n) { return n === 3 ? 'Gold' : n === 2 ? 'Silver' : 'Member'; }
function safeImg(src) { return (src && typeof src === 'string') ? src : 'images/logo.svg'; }
function esc(s = '') { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }