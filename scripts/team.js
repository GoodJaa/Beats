// Team section

; (function () {
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
})()