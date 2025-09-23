// Fetch members, render directory, toggle grid/list, dates, and mobile nav
document.addEventListener("DOMContentLoaded", () => {
  const directory = document.getElementById("directory");
  const gridBtn = document.getElementById("gridBtn");
  const listBtn = document.getElementById("listBtn");
  const menuBtn = document.getElementById("menu");
  const navlist = document.getElementById("navlist");
  const DATA_URL = "./data/members.json";

  // Hamburger for small screens
  if (menuBtn && navlist) {
    menuBtn.addEventListener("click", () => {
      const open = navlist.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Load + render members
  async function loadMembers(view = "grid") {
    try {
      const res = await fetch(`${DATA_URL}?v=${Date.now()}`); // cache-bust while testing
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      renderMembers(data, view);
    } catch (e) {
      console.error("Member data fetch failed:", e);
      directory.innerHTML = `<p class="error">Could not load member data. ${e.message}</p>`;
      directory.className = ""; // avoid layout confusion
    }
  }

  function renderMembers(members, view) {
    directory.className = (view === "grid") ? "cards" : "list";
    directory.innerHTML = "";

    members.forEach((m) => {
      const el = document.createElement("div");
      el.className = (view === "grid") ? "member-card" : "member-list";
      el.innerHTML = `
        <img src="./images/${m.image}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a href="${m.website}" target="_blank" rel="noopener">Visit Website</a>
        <p><strong>Membership:</strong> ${m.membership === 3 ? "Gold" : (m.membership === 2 ? "Silver" : "Member")}</p>
        <p>${m.description}</p>
      `;
      directory.appendChild(el);
    });
  }

  // Toggle buttons
  gridBtn?.addEventListener("click", () => {
    gridBtn.classList.add("active");
    listBtn?.classList.remove("active");
    loadMembers("grid");
  });

  listBtn?.addEventListener("click", () => {
    listBtn.classList.add("active");
    gridBtn?.classList.remove("active");
    loadMembers("list");
  });

  // Footer dates
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  const lastModified = document.getElementById("lastModified");
  if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;

  // Initial render
  loadMembers();
});