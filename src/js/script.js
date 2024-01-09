import {loadImages} from "./config.js";
export function initializeOwlCarousel() {
    $('.owl-carousel').owlCarousel({
        items: 5,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2000,
        autoplayHoverPause: true,
        rtl: true,
        margin: 10,
        responsiveClass: true,
        responsive: {
            0: {
                items: 2
            },
            576: {
                items: 3
            },
            768: {
                items: 4
            },
            992: {
                items: 4
            },
            1200: {
                items: 5.258
            }
        }
    });
}


