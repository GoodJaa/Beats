let player;

const playerBlock = $('.player');

let eventsInit = () => {
    $(".player__start-btn").click(e => {
        e.preventDefault();

        playerBlock.addClass("active");

        if (playerBlock.hasClass("paused")) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    });

    $('.player__playback').click(e => {
        const bar = $(e.currentTarget);
        const clickedPosition = e.originalEvent.layerX;
        const newClickedPosition = (clickedPosition / bar.width()) * 100;
        const nePlaybackPositionSec = (player.getDuration() / 100) * newClickedPosition;

        $(".player__playback-btn").css({
            left: `${newClickedPosition}%`
        });

        player.seekTo(nePlaybackPositionSec);
    });

    $('.player__splash').click(e=> {
        player.playVideo();
    });
};

eventsInit();

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor( roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration-end").text(formatTime(durationSec));

    if (typeof interval !== "undefined") {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const currentSec = player.getCurrentTime();
        const complitedPercent = (currentSec / durationSec) * 100;

        $(".player__playback-btn").css({
            left: `${complitedPercent}%`
        });

        $(".player__playback-line").css({
            width: `${complitedPercent}%`
        });

        $('.player__duration-current').text(formatTime(currentSec))
    }, 1000);
};

const onPlayerStateChange = event => {
    switch (event.data) {
        /* Возвращает состояние проигрывателя. Возможные значения:
            -1 – воспроизведение видео не началось
            0 – воспроизведение видео завершено
            1 – воспроизведение
            2 – пауза
            3 – буферизация
            5 – видео находится в очереди */
        case 1:
            playerBlock.addClass('active');
            playerBlock.addClass("paused");
            break;
    
        case 2:
            playerBlock.removeClass('active');
            playerBlock.removeClass("paused");
            break;
    }
}

onPlayerReady();

function onYouTubeIframeAPIReady() {
    player = new YT.Player("yt-player", {
        height: '400',
        width: '640',
        videoId: 'xBiXELRMwhI',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
        playerVars: {
            controls: 0,
            disablekb: 1,
            showinfo: 0,
            rel: 0,
            autoplay: 0,
            modestbranding: 1
        }
    });
}