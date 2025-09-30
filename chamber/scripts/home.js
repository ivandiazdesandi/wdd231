// === Weather ===
const apiKey = "bfe8339c2402b3057229b0d727d59e73";
const city = "Sydney,AU";
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const response = await fetch(url);
    const data = await response.json();

    // Current weather
    document.getElementById("current-temp").textContent =
      `Current Temp: ${data.list[0].main.temp.toFixed(1)} °C`;
    document.getElementById("weather-desc").textContent =
      data.list[0].weather[0].description;

    // 3-day forecast (take every 8th item = 24 hours)
    const forecastDiv = document.getElementById("forecast");
    forecastDiv.innerHTML = "";
    for (let i = 8; i <= 24; i += 8) {
      const day = data.list[i];
      const p = document.createElement("p");
      p.textContent = `${day.dt_txt.split(" ")[0]}: ${day.main.temp.toFixed(1)} °C`;
      forecastDiv.appendChild(p);
    }
  } catch (error) {
    document.getElementById("current-temp").textContent = "Weather unavailable.";
  }
}
fetchWeather();

// === Spotlights ===
async function loadSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const members = await response.json();

    // Filter gold (3) or silver (2) members
    const eligible = members.filter(m =>
      m.membershipLevel === 2 || m.membershipLevel === 3
    );

    // Pick 2–3 random
    const selected = [];
    while (selected.length < 3 && eligible.length > 0) {
      const rand = Math.floor(Math.random() * eligible.length);
      selected.push(eligible.splice(rand, 1)[0]);
    }

    // Display cards
    const container = document.getElementById("spotlight-container");
    container.innerHTML = "";
    selected.forEach(m => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${m.image}" alt="${m.name} logo">
        <h3>${m.name}</h3>
        <p>${m.address}</p>
        <p>${m.phone}</p>
        <a href="${m.website}" target="_blank">${m.website}</a>
        <p>Level: ${m.membershipLevel === 3 ? "Gold" : "Silver"}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    document.getElementById("spotlight-container").textContent =
      "Unable to load member spotlights.";
  }
}
loadSpotlights();