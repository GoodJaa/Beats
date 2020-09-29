const sections = $("section");
const display = $(".maincontent");
const fixedMenu = $(".fixed-menu__list");
const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
    const position = sectionEq * -100
    
    if(isNaN(position)) {
        console.error('передано не верное значение в countSectionPosition');
        return 0;
    }

    return position;
};

const changeMenuThemeForSection = sectionEq => {
    const curSection = sections.eq(sectionEq);
    const menuTheme = curSection.attr("data-sidemenu-theme");

    $(".fixed-menu__item").removeClass("fixed-menu__item--active--white");

    if (menuTheme === "white") {
        fixedMenu
            .find(".fixed-menu__item")
            .eq(sectionEq)
            .addClass("fixed-menu__item--active--white")
            .siblings()
            .removeClass("fixed-menu__item--active--white");
    }
};

const perfomTransition = sectionEq => {
    if (inScroll === false) {
        inScroll = true;

        const transitionOver = 1000;
        const mouseInertiaOver = 300;

        const position = countSectionPosition(sectionEq);

        changeMenuThemeForSection(sectionEq);

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq)
            .addClass("active")
            .siblings()
            .removeClass("active");

        setTimeout(() => {
            inScroll = false;
        }, transitionOver + mouseInertiaOver);

        fixedMenu
            .find(".fixed-menu__item")
            .eq(sectionEq)
            .addClass("fixed-menu__item--active")
            .siblings()
            .removeClass("fixed-menu__item--active");
    }
};

const viewportScroller = () => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    return {
        next() {
            if (nextSection.length) {
                perfomTransition(nextSection.index());
            }
        },
        prev() {
            if (prevSection.length) {
                perfomTransition(prevSection.index());
            }
        }
    };
};

$(window).on("wheel", (e) => {
    const wheelY = e.originalEvent.deltaY;
    const scroller = viewportScroller();

    if (wheelY > 0) {
        scroller.next();
    }

    if (wheelY < 0) {
        scroller.prev();
    }
});

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (e.keyCode) {
            case 38:
                scroller.next();
                break;

            case 40:
                scroller.prev();
                break;
        }
    }
});

$("[data-scroll-to]").click(e => {
    e.preventDefault();

    $(".fixed-menu__item").removeClass("fixed-menu__item--active");

    const $this = $(e.currentTarget);
    const target = $this.attr("data-scroll-to");
    const reqSection = $(`[data-section-id=${target}]`);

    perfomTransition(reqSection.index());
});

// https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

if (isMobile) {
    $("body").swipe({
        swipe: function (
            event,
            direction
            ) {
            const scroller = viewportScroller();
    
            let scrollDirection = "";
    
            if (direction === "up") scrollDirection = "next";
            if (direction === "down") scrollDirection = "prev";
    
            scroller[scrollDirection]();
        }
    });
}



