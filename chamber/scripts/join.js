// Footer dates
document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent =
  `Last Modified: ${document.lastModified}`;

// Hidden timestamp (when form loaded)
const ts = document.getElementById("timestamp");
if (ts) ts.value = new Date().toISOString();

// Simple modal handling using native <dialog>
function wireModals() {
  document.querySelectorAll('[data-open]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const dlg = document.getElementById(link.dataset.open);
      if (dlg && typeof dlg.showModal === 'function') dlg.showModal();
    });
  });

  document.querySelectorAll('dialog [data-close]').forEach(btn => {
    btn.addEventListener('click', () => {
      const dlg = btn.closest('dialog');
      if (dlg) dlg.close();
    });
  });
}
wireModals();