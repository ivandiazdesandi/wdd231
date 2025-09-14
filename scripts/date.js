document.addEventListener("DOMContentLoaded", () => {
  // Current year
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }

  // Last modified
  const modified = document.lastModified;
  const lastModifiedPara = document.getElementById("lastModified");
  if (lastModifiedPara) {
    lastModifiedPara.textContent = `Last Modified: ${modified}`;
  }
});