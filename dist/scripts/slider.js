// slider

; (function () {
    const rightArrow = document.querySelector('#right');
    const leftArrow = document.querySelector('#left');
    const product = document.querySelector('.product-wrapper');

    let currentPosition = 0;

    rightArrow.addEventListener('click', e => {
        if (currentPosition < 100) {
            currentPosition += 100;
            product.style.right = currentPosition + '%';
        }

    });

    leftArrow.addEventListener('click', e => {
        if (currentPosition > 0) {
            currentPosition -= 100;
            product.style.right = currentPosition + '%';
        }
    });
})()