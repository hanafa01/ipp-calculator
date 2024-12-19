//sidebar
const toggleMenu = document.getElementById("toggle-menu");
const sideMenu = document.getElementById("side-menu");

toggleMenu.addEventListener("click", () => {
  sideMenu.classList.toggle("active");
});
//end sidebar


// Dark Mode
var checkbox = document.querySelector("input[name=theme]");

checkbox.addEventListener("change", function () {
  trans();
  if (this.checked) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

function trans() {
  document.documentElement.classList.add("transition");
  window.setTimeout(() => {
    document.documentElement.classList.remove("transition");
  }, 1000);
}
// End Dark Mode
