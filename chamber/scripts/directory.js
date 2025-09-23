// chamber/scripts/directory.js

const container = document.getElementById('directory');
const btnGrid = document.getElementById('btnGrid');
const btnList = document.getElementById('btnList');

// Build the correct data URL for local dev and GitHub Pages
const dataURL = location.hostname.includes('github.io')
  ? 'https://ivandiazdesandi.github.io/wdd231/chamber/data/members.json'
  : 'data/members.json';

async function loadMembers() {
  try {
    const res = await fetch(`${dataURL}?v=${Date.now()}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    // initial render
    renderGrid(members);

    // wire buttons
    btnGrid.addEventListener('click', () => renderGrid(members));
    btnList.addEventListener('click', () => renderList(members));
  } catch (err) {
    console.error('Directory fetch failed:', err);
    container.innerHTML = `<p class="error" style="color:#b00020">Could not load member data. ${err.message}</p>`;
  }
}

function renderGrid(members) {
  container.className = 'grid';
  container.innerHTML = members.map(m => cardHTML(m)).join('');
}

function renderList(members) {
  container.className = 'list';
  container.innerHTML = `
    <ul class="list-plain">
      ${members.map(m => `
        <li>
          <span class="name">${escapeHTML(m.name)}</span>
          <span class="phone">${escapeHTML(m.phone)}</span>
          <a href="${m.website}" target="_blank" rel="noopener">${m.website}</a>
        </li>
      `).join('')}
    </ul>
  `;
}

function cardHTML(m) {
  // fallback image if missing or typo
  const imgSrc = m.image && typeof m.image === 'string' ? m.image : 'images/logo.svg';
  const tier = Number(m.membershipLevel) || 1;

  return `
    <article class="card">
      <img src="${imgSrc}" alt="${escapeAttr(m.name)} logo" loading="lazy" width="160" height="160">
      <h3>${escapeHTML(m.name)}</h3>
      <p>${escapeHTML(m.address)}</p>
      <p>${escapeHTML(m.phone)}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Visit website</a>
      <p class="tier tier-${tier}">Membership: ${tierLabel(tier)}</p>
    </article>
  `;
}

function tierLabel(n) {
  return n === 3 ? 'Gold' : n === 2 ? 'Silver' : 'Member';
}

// very small helpers to keep things safe
function escapeHTML(s = '') { return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])); }
function escapeAttr(s = '') { return escapeHTML(s); }

// kick it off
loadMembers();