//reviews section

; (function () {

    const findReviewByAlias = alias => {
        return $('.reviews__display-inner').filter((ndx, item) => {
            return $(item).attr('data-item') === alias;
        });
    };

    $('.interactive-avatar__link').click(function (e) {
        e.preventDefault();

        const $this = $(e.currentTarget);
        const curReview = $this.closest('.reviews__switcher-item');
        const target = curReview.attr('data-link');
        const showReview = findReviewByAlias(target);

        showReview.addClass('active').siblings().removeClass('active');
        curReview.addClass('active').siblings().removeClass('active');
    });
})()
