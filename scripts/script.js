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

//product parameters-button, dropdown menu

const parametersBtnWrapper = document.querySelector(".parameters__btn-wrapper");
const parametersBtn = document.querySelector(".parameters__btn");
const productDropdown = document.querySelector(".product__dropdown");



parametersBtn.onclick = function() {
    productDropdown.style.display = productDropdown.style.display === "block" ? "none" : "block";
};

// parametersBtn.onclick = function () {

//     if (productDropdown.style.display === 'block') {
//         productDropdown.style.display = 'none';
//     } else {
//         productDropdown.style.display = 'block';
//     }
// };


// Team section

const openItem = open => {
    const teamMember = open.closest('.team__member');
    const memberContent = teamMember.find('.member__content');
    const contentText = memberContent.find('.member__content-block');
    const decorElem = open.children('.dropdown__decor');
    const curHeight = contentText.height();

    decorElem.addClass('dropdown__decor--active');
    teamMember.addClass('active');
    memberContent.height(curHeight);
};

const closeEveryItem = closeEvery => {
    const items = closeEvery.find('.member__content');
    const containerItem = closeEvery.find('.team__member');
    const decor = closeEvery.find('.dropdown__decor');

    decor.removeClass('dropdown__decor--active');
    containerItem.removeClass('active');
    items.height(0);
};

$('.member__dropdown').click(e => {
    const $this = $(e.currentTarget);
    const everyItem = $this.closest('.team__list');
    const activeElem = $this.closest('.team__member');
    const activeDecor = $this.children('.dropdown__decor');

    if (activeElem.hasClass('active') && activeDecor.hasClass('dropdown__decor--active')) {
        closeEveryItem(everyItem);
    } else {
        closeEveryItem(everyItem);
        openItem($this);
    }
});

//reviews section

// const link = document.querySelectorAll('.interactive-avatar__link');


// const reviewsSec = () => {
//     const reviews = document.querySelector('.reviews__switcher');
//     reviews.addEventListener('click', evt => {
//         evt.preventDefault();
//         let link = evt.target;
//         console.log(evt);
//     });
// };

const findReviewByAlias = alias => {
    return $('.reviews__display-inner').filter((ndx, item) => {
        return $(item).attr('data-item') === alias;
    });
};

$('.interactive-avatar__link').click( function(e) {
    e.preventDefault();
    
    const $this = $(e.currentTarget);
    const curReview = $this.closest('.reviews__switcher-item');
    const target = curReview.attr('data-link');
    const showReview = findReviewByAlias(target);

    showReview.addClass('active').siblings().removeClass('active');
    curReview.addClass('active').siblings().removeClass('active');
});

// slider

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

// form
const validateFields = (form, validateArray) => {

    validateArray.forEach((field) => {
        field.removeClass('input-error');
        if (field.val().trim() === "") {
            field.addClass('input-error');
        }
    });

    const errorFields = form.find('.input-error');

    return errorFields.length === 0;
};

$('.form').submit( e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name = 'name']");
    const phone = form.find("[name = 'phone']");
    const comment = form.find("[name = 'comment']");
    const to = form.find("[name = 'to']");

    const isValid = validateFields(form, [name, phone, comment, to]);

    const modal = $('#modal');
    const content = modal.find('.modal__content');

    modal.removeClass('modal--error');

    if (isValid) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: "post",
            data: {
                name: name.val(),
                phone: phone.val(),
                comment: comment.val(),
                to: to.val()
            },

            success: data => {
                content.text(data.message);
                $('#modal').addClass('modal--active');
            },

            error: data => {
                const errorMes = data.responseJSON.message;
                content.text(errorMes);
                $('#modal').addClass('modal--active modal--error');
            }
        });
    }

    // const data = {
    //     name: form.elements.name.value,
    //     phone: form.elements.phone.value,
    //     comment: form.elements.comment.value,
    //     to: form.elements.to.value
    // };
    // const xhr = new XMLHttpRequest();
    // xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail');
    // xhr.send(JSON.stringify(data));
});

$('.modal-close-btn').click( close => {
    close.preventDefault();

    if ($('#modal').hasClass('modal--active')) {
        $('#modal').removeClass('modal--active');
    }
});