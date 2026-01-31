document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const lastModified = document.getElementById("lastModified");
  if (lastModified) lastModified.textContent = `Last Modified: ${document.lastModified}`;
});