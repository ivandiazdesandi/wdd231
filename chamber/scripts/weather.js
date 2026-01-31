const API_KEY = "bfe8339c2402b3057229b0d727d59e73";

// Sydney, AU (good default)
const LAT = -33.8688;
const LON = 151.2093;
const UNITS = "metric"; // Celsius

const nowEl = document.getElementById("weatherNow");
const forecastEl = document.getElementById("forecast");

document.addEventListener("DOMContentLoaded", () => {
  if (!API_KEY || API_KEY.includes("PASTE_")) {
    showWeatherError("Missing OpenWeatherMap API key. Add it in scripts/weather.js.");
    return;
  }
  loadWeather();
});

async function loadWeather() {
  try {
    // Current
    const nowUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
    const nowRes = await fetch(nowUrl);
    if (!nowRes.ok) throw new Error(`Weather HTTP ${nowRes.status}`);
    const nowData = await nowRes.json();

    renderCurrent(nowData);

    // Forecast (3-hour increments)
    const fcUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
    const fcRes = await fetch(fcUrl);
    if (!fcRes.ok) throw new Error(`Forecast HTTP ${fcRes.status}`);
    const fcData = await fcRes.json();

    render3DayForecast(fcData);
  } catch (err) {
    console.error(err);
    showWeatherError("Could not load weather data. Please try again later.");
  }
}

function renderCurrent(data) {
  const temp = Math.round(data.main.temp);
  const desc = capitalize(data.weather?.[0]?.description || "No description");
  const icon = data.weather?.[0]?.icon;

  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : "";

  nowEl.innerHTML = `
    <div class="weather-row">
      ${iconUrl ? `<img src="${iconUrl}" alt="${desc}" width="64" height="64" loading="lazy">` : ""}
      <div>
        <p><strong>${temp}°C</strong> — ${desc}</p>
        <p class="muted">Sydney, AU</p>
      </div>
    </div>
  `;
}

function render3DayForecast(data) {
  // data.list is 3-hour blocks. We want one reading per day for next 3 days.
  // Choose the reading closest to 12:00 local time (approx). If not available, take first for that day.
  const list = Array.isArray(data.list) ? data.list : [];
  const byDay = new Map();

  for (const item of list) {
    const dtTxt = item.dt_txt; // "YYYY-MM-DD HH:MM:SS"
    if (!dtTxt) continue;

    const [dateStr, timeStr] = dtTxt.split(" ");
    if (!dateStr || !timeStr) continue;

    if (!byDay.has(dateStr)) byDay.set(dateStr, []);
    byDay.get(dateStr).push(item);
  }

  const today = new Date();
  const dates = [];

  // next 3 days (not including today)
  for (let i = 1; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push(d.toISOString().slice(0, 10)); // YYYY-MM-DD
  }

  const cards = dates.map((dateStr) => {
    const items = byDay.get(dateStr) || [];
    if (items.length === 0) {
      return forecastCard(dateStr, null);
    }

    // pick closest to 12:00 (time "12:00:00")
    const target = "12:00:00";
    let best = items[0];
    let bestDiff = Infinity;

    for (const it of items) {
      const t = it.dt_txt.split(" ")[1];
      const diff = Math.abs(timeToMinutes(t) - timeToMinutes(target));
      if (diff < bestDiff) {
        best = it;
        bestDiff = diff;
      }
    }

    return forecastCard(dateStr, best);
  });

  forecastEl.innerHTML = cards.join("");
}

function forecastCard(dateStr, item) {
  const label = prettyDate(dateStr);

  if (!item) {
    return `
      <div class="forecast-card">
        <p><strong>${label}</strong></p>
        <p class="muted">No forecast available</p>
      </div>
    `;
  }

  const temp = Math.round(item.main.temp);
  const desc = capitalize(item.weather?.[0]?.description || "");
  const icon = item.weather?.[0]?.icon;
  const iconUrl = icon ? `https://openweathermap.org/img/wn/${icon}.png` : "";

  return `
    <div class="forecast-card">
      <p><strong>${label}</strong></p>
      ${iconUrl ? `<img src="${iconUrl}" alt="${desc}" width="50" height="50" loading="lazy">` : ""}
      <p>${temp}°C</p>
      <p class="muted">${desc}</p>
    </div>
  `;
}

function showWeatherError(msg) {
  if (nowEl) nowEl.innerHTML = `<p style="color:#b00020">${msg}</p>`;
  if (forecastEl) forecastEl.innerHTML = "";
}

function capitalize(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

function timeToMinutes(t) {
  const [hh, mm] = String(t).split(":");
  return Number(hh) * 60 + Number(mm);
}

function prettyDate(yyyyMmDd) {
  const [y, m, d] = yyyyMmDd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}