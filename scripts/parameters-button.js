//product parameters-button, dropdown menu

; (function () {
    const parametersBtnWrapper = document.querySelector(".parameters__btn-wrapper");
    const parametersBtn = document.querySelector(".parameters__btn");
    const productDropdown = document.querySelector(".product__dropdown");



    parametersBtn.onclick = function () {
        productDropdown.style.display = productDropdown.style.display === "block" ? "none" : "block";
    };

    // parametersBtn.onclick = function () {

    //     if (productDropdown.style.display === 'block') {
    //         productDropdown.style.display = 'none';
    //     } else {
    //         productDropdown.style.display = 'block';
    //     }
    // };
})()
