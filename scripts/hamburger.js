//hamburger-menu

const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const links = document.querySelectorAll(".menu__link");

links.forEach(function(e) {
    e.addEventListener('click', toggleMenu);
});

function toggleMenu() {
    menu.classList.toggle("menu--overlay");
    hamburger.classList.toggle("hamburger--close");
}

hamburger.addEventListener('click' , toggleMenu);