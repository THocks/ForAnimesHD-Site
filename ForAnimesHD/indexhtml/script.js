// nav mobile //

const menu = document.querySelector(".mobile-menu");
const navList = document.querySelector("nav ul");

menu.addEventListener("click", (e) => {
  console.log("menu clicked");
  navList.classList.toggle("active");
  menu.classList.toggle("open");
  document.body.classList.toggle("menu-expanded");
  window.scroll(0, 0);
});
