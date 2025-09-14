document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menu");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  // Toggle nav on small screens
  menuButton.addEventListener("click", () => {
    nav.classList.toggle("show");

    // Update aria-expanded for accessibility
    const expanded = menuButton.getAttribute("aria-expanded") === "true" || false;
    menuButton.setAttribute("aria-expanded", !expanded);
  });

  // Wayfinding: highlight current page
  const currentPage = location.pathname.split("/").pop();
  navLinks.forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
    }
  });
});