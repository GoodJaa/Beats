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
