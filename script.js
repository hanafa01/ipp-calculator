//sidebar
const toggleMenu = document.getElementById("toggle-menu");
const sideMenu = document.getElementById("side-menu");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});
//end sidebar