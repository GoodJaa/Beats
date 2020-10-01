// color

; (function () {
    (function () {
        const body = document.querySelector('body');
        const links = document.querySelectorAll('.product-color__switch');

        let calculateWidth = () => {
            const windowWidt = window.innerWidth;
            const MAX_WIDTH = 550;

            const linkWidth = links[0].offsetWidth;
            const needWidth = windowWidt - (linkWidth * links.length);

            return needWidth > MAX_WIDTH ? MAX_WIDTH : needWidth;

        };

        function closeItem(activeElem) {
            const activeText = activeElem.querySelector('.product-color__desc');
            activeText.style.width = "0px";
            activeElem.classList.remove('active');
        }

        links.forEach(function (elem) {
            elem.addEventListener('click', e => {
                e.preventDefault();
                const link = e.target.closest('.product-color__switch');
                const active = document.querySelector('.product-color__item.active');

                if (active) {
                    closeItem(active);
                }

                if (!active || active.querySelector('.product-color__switch') !== link) {
                    const current = link.closest('.product-color__item');
                    current.classList.add('active');
                    const currentText = current.querySelector('.product-color__desc');

                    if (body.offsetWidth > 480) {
                        currentText.style.width = calculateWidth() + "px";
                    } else {
                        currentText.style.width = (window.innerWidth - links[0].offsetWidth) + "px";
                    }
                }
            });
        });

        document.addEventListener('click', e => {

            const links = document.querySelector('.product-color__item');
            const activeLinks = document.querySelector('.product-color__item.active');
            const target = e.target;

            if (!target.closest('.product-color__item') && activeLinks) {
                closeItem(activeLinks);
            }
        });
    })();
})()

