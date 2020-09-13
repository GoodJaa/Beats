//hamburger-menu

const hamburgerButton = document.querySelector(".hamburger");
const hamburgerMenu = document.querySelector(".menu");
const menuCloser = document.querySelector(".menu-closer");
const hero = document.querySelector(".hero");


hamburgerButton.addEventListener("click", e => {
    e.preventDefault();
    const hamburgerMenuClone = hamburgerMenu.cloneNode(true);
    hero.appendChild(hamburgerMenuClone);
    hamburgerMenuClone.style.display = "flex";

    menuCloser.addEventListener("click", e => {
        e.preventDefault();
        hero.removeChild(hamburgerMenuClone);
    });
});

//product parameters-button, dropdown menu

const parametersBtnWrapper = document.querySelector(".parameters__btn-wrapper");
const parametersBtn = document.querySelector(".parameters__btn");
const productDropdown = document.querySelector(".product__dropdown");



parametersBtn.onclick = function() {
    productDropdown.style.display = productDropdown.style.display === "block" ? "none" : "block";
}