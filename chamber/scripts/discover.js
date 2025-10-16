// Fetch data and create cards dynamically
async function loadDiscoverCards() {
  try {
    const res = await fetch("data/discover.json");
    const places = await res.json();

    const grid = document.querySelector("#discoverGrid");
    grid.innerHTML = "";

    places.forEach(place => {
      const card = document.createElement("section");
      card.classList.add("card");
      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" loading="lazy" width="300" height="200">
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading data:", err);
  }
}

// Visitor message using localStorage
function visitMessage() {
  const msg = document.getElementById("visitMsg");
  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const now = Date.now();

  if (!lastVisit) {
    msg.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysDiff = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysDiff < 1) msg.textContent = "Back so soon! Awesome!";
    else msg.textContent = `You last visited ${daysDiff} day${daysDiff === 1 ? "" : "s"} ago.`;
  }
  localStorage.setItem("lastVisit", now);
}

// Footer dynamic info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("mod").textContent = document.lastModified;

// Initialize
visitMessage();
loadDiscoverCards();