const sections = $("section");
const display = $(".maincontent");
const fixedMenu = $(".fixed-menu__list");

let inScroll = false;

sections.first().addClass("active");

const perfomTransition = sectionEq => {
    if (inScroll === false) {
        inScroll = true;
        const position = sectionEq * -100;

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

        display.css({
            transform: `translateY(${position}%)`
        });

        sections.eq(sectionEq)
            .addClass("active")
            .siblings()
            .removeClass("active");

        setTimeout(() => {
            inScroll = false;
        }, 1300);

        fixedMenu
            .find(".fixed-menu__item")
            .eq(sectionEq)
            .addClass("fixed-menu__item--active")
            .siblings()
            .removeClass("fixed-menu__item--active");
    }
};

const scrollViewport = (direction) => {
    const activeSection = sections.filter(".active");
    const nextSection = activeSection.next();
    const prevSection = activeSection.prev();

    if (direction == "next" && nextSection.length) {
        perfomTransition(nextSection.index());
    }

    if (direction == "prev" && prevSection.length) {
        perfomTransition(prevSection.index());
    }
};

$(window).on("wheel", (e) => {
    const wheelY = e.originalEvent.deltaY;

    if (wheelY > 0) {
        scrollViewport("next");
    }

    if (wheelY < 0) {
        scrollViewport("prev");
    }
});

$(window).on('keydown', (e) => {
    const tagName = e.target.tagName.toLowerCase();

    if (tagName !== "input" && tagName !== "textarea") {
        switch (e.keyCode) {
            case 38:
                scrollViewport("prev");
                break;
        
            case 40:
                scrollViewport("next");
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