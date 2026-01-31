// chamber/scripts/join.js
document.addEventListener("DOMContentLoaded", () => {
  // Timestamp for the form
  const ts = document.getElementById("timestamp");
  if (ts) ts.value = new Date().toISOString();

  // Dialog open buttons
  document.querySelectorAll("[data-open]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-open");
      const dlg = document.getElementById(id);
      if (dlg && typeof dlg.showModal === "function") dlg.showModal();
    });
  });

  // Dialog close buttons
  document.querySelectorAll("dialog [data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const dlg = btn.closest("dialog");
      if (dlg) dlg.close();
    });
  });

  // Close dialog when clicking backdrop area
  document.querySelectorAll("dialog").forEach((dlg) => {
    dlg.addEventListener("click", (e) => {
      const rect = dlg.getBoundingClientRect();
      const clickedInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      // If click is outside the dialog box area, close it
      if (!clickedInDialog) dlg.close();
    });
  });
});