//hamburger-menu

const menu = document.querySelector(".menu");
const hamburger = document.querySelector(".hamburger");
const links = document.querySelectorAll(".menu__link");

links.forEach(function(link) {
    link.addEventListener('click', toggleMenu)
});

function toggleMenu() {
    menu.classList.toggle("menu--overlay");
    hamburger.classList.toggle("hamburger--close");
}

hamburger.addEventListener('click' , toggleMenu);



//product parameters-button, dropdown menu

const parametersBtnWrapper = document.querySelector(".parameters__btn-wrapper");
const parametersBtn = document.querySelector(".parameters__btn");
const productDropdown = document.querySelector(".product__dropdown");



parametersBtn.onclick = function() {
    productDropdown.style.display = productDropdown.style.display === "block" ? "none" : "block";
}