import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discoverGrid");
const visitMessage = document.querySelector("#visitMessage");

renderVisitMessage();
renderCards(places);

function renderCards(items) {
  if (!grid) return;

  // Build cards (must include: h2, figure+img, address, p, button)
  grid.innerHTML = items.map((p, index) => {
    const areaClass = `area-${index + 1}`; // area-1..area-8
    return `
      <article class="discover-card ${areaClass}">
        <h2>${escapeHtml(p.title)}</h2>

        <figure>
          <img
            src="${p.image}"
            alt="${escapeHtml(p.title)}"
            loading="lazy"
            width="300"
            height="200"
          />
          <figcaption class="sr-only">${escapeHtml(p.title)}</figcaption>
        </figure>

        <address>${escapeHtml(p.address)}</address>
        <p>${escapeHtml(p.description)}</p>

        <button class="learn-more" type="button" data-url="${p.learnMoreUrl}">
          Learn more
        </button>
      </article>
    `;
  }).join("");

  // Button events
  grid.querySelectorAll(".learn-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const url = btn.getAttribute("data-url");
      if (url) window.open(url, "_blank", "noopener");
    });
  });
}

/* ---------------------------
   localStorage visit message
---------------------------- */
function renderVisitMessage() {
  if (!visitMessage) return;

  const KEY = "discover_last_visit";
  const now = Date.now();
  const last = Number(localStorage.getItem(KEY));

  let msg = "Welcome! Let us know if you have any questions.";

  if (!Number.isNaN(last) && last > 0) {
    const diffMs = now - last;
    const diffDays = Math.floor(diffMs / 86400000); // whole days

    if (diffDays < 1) {
      msg = "Back so soon! Awesome!";
    } else if (diffDays === 1) {
      msg = "You last visited 1 day ago.";
    } else {
      msg = `You last visited ${diffDays} days ago.`;
    }
  }

  // Add close button (nice UX, still meets rubric)
  visitMessage.innerHTML = `
    <div class="visit-inner">
      <p>${msg}</p>
      <button type="button" class="visit-close" aria-label="Close message">×</button>
    </div>
  `;

  const closeBtn = visitMessage.querySelector(".visit-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      visitMessage.innerHTML = "";
    });
  }

  localStorage.setItem(KEY, String(now));
}

/* ---------------------------
   helpers
---------------------------- */
function escapeHtml(str = "") {
  return String(str).replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  }[m]));
}