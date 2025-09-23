// scripts/directory.js
const dataURL = location.hostname.includes('github.io')
  ? 'https://ivandiazdesandi.github.io/wdd231/chamber/data/members.json'
  : 'data/members.json';

const directory = document.getElementById('directory');
const btnGrid = document.getElementById('btnGrid');
const btnList = document.getElementById('btnList');

async function loadMembers() {
  try {
    const res = await fetch(dataURL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderGrid(data.members);
    wireViewButtons(data.members);
  } catch (err) {
    directory.innerHTML = `<p class="error">Could not load member data. ${err.message}</p>`;
  }
}

function renderGrid(members) {
  directory.className = 'grid';
  directory.innerHTML = members.map(m => `
    <article class="card">
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" width="160" height="160">
      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.url}" target="_blank" rel="noopener">Visit website</a>
      <p class="tier tier-${m.membership}">Tier ${m.membership}</p>
    </article>
  `).join('');
}

function renderList(members) {
  directory.className = 'list';
  directory.innerHTML = `
    <ul class="list-plain">
      ${members.map(m => `
        <li>
          <span>${m.name}</span>
          <span>${m.phone}</span>
          <a href="${m.url}" target="_blank" rel="noopener">${m.url}</a>
        </li>
      `).join('')}
    </ul>`;
}

function wireViewButtons(members) {
  btnGrid.onclick = () => renderGrid(members);
  btnList.onclick = () => renderList(members);
}

loadMembers();