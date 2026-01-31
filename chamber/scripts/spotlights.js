// chamber/scripts/spotlights.js

const spotlightsEl = document.getElementById("spotlights");

// Works locally and on GitHub Pages
const dataURL = location.hostname.includes("github.io")
  ? "https://ivandiazdesandi.github.io/wdd231/chamber/data/members.json"
  : "data/members.json";

document.addEventListener("DOMContentLoaded", () => {
  loadSpotlights();
});

async function loadSpotlights() {
  if (!spotlightsEl) return;

  try {
    const res = await fetch(`${dataURL}?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    const eligible = Array.isArray(members)
      ? members.filter(m => Number(m.membershipLevel) === 2 || Number(m.membershipLevel) === 3)
      : [];

    if (eligible.length < 2) {
      spotlightsEl.innerHTML = `<p class="muted">Not enough Silver/Gold members in members.json.</p>`;
      return;
    }

    const count = Math.random() < 0.5 ? 2 : 3;
    const picks = pickRandomUnique(eligible, count);

    spotlightsEl.innerHTML = picks.map(cardHTML).join("");
  } catch (err) {
    console.error("Spotlights failed:", err);
    spotlightsEl.innerHTML = `<p style="color:#b00020">Could not load spotlights.</p>`;
  }
}

function cardHTML(m) {
  const level = Number(m.membershipLevel) || 1;
  const label = level === 3 ? "Gold" : level === 2 ? "Silver" : "Member";

  const imgSrc = (m.image && typeof m.image === "string") ? m.image : "images/logo.svg";

  return `
    <article class="card">
      <img src="${imgSrc}" alt="${escapeHTML(m.name)} logo" loading="lazy" width="90" height="90">
      <h3>${escapeHTML(m.name)}</h3>
      <p>${escapeHTML(m.address)}</p>
      <p>${escapeHTML(m.phone)}</p>
      <a href="${m.website}" target="_blank" rel="noopener">Visit website</a>
      <p class="tier tier-${level}">Membership: ${label}</p>
    </article>
  `;
}

function pickRandomUnique(arr, n) {
  const copy = [...arr];
  shuffle(copy);
  return copy.slice(0, Math.min(n, copy.length));
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
}

function escapeHTML(s = "") {
  return String(s).replace(/[&<>"']/g, ch => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[ch]));
}