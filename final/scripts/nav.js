// Responsive hamburger + wayfinding
export function initNav(currentPathname = location.pathname){
  const btn = document.querySelector('.nav-toggle');
  const list = document.querySelector('nav ul');

  if (btn && list){
    btn.addEventListener('click', () => {
      const shown = list.style.display === 'flex' || list.style.display === 'block';
      list.style.display = shown ? 'none' : (window.matchMedia('(min-width:800px)').matches ? 'flex' : 'block');
    });
  }

  // Wayfinding: mark current page link
  document.querySelectorAll('nav a').forEach(a=>{
    const href = new URL(a.href, location.origin).pathname;
    if(href === currentPathname){ a.setAttribute('aria-current','page'); }
  });
}