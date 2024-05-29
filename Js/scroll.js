// efek scroll pada navbar
var navbar = document.querySelector("header");
window.addEventListener("scroll", function () {
  if (window.scrollY > 0) {
    navbar.classList.add("navbar-scrolled");
  } else {
    navbar.classList.remove("navbar-scrolled");
  }
});
