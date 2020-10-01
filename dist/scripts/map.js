; (function () {
    let myMap;

const init = () => {
    myMap = new ymaps.Map("mymap", {
        center: [59.211776, 39.899919],
        zoom: 13,
        controls: []
    });

    const coords = [
        [59.221714, 39.867598],
        [59.195161, 39.862712],
        [59.210938, 39.892509],
        [59.218302, 39.918668],
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        iconImageHref: './img/icons/marker.svg',
        iconLayout: 'default#image',
        iconImageSize: [58, 73],
        iconImageOffset: [-3, -42],
        draggable: false,
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);
    myMap.behaviors.disable('scrollZoom');

    
};

ymaps.ready(init);
})()