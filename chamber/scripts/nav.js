// Simple hamburger for small screens
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('menuButton');
  const nav = document.getElementById('primaryNav');
  if (!menuBtn || !nav) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
  });
});