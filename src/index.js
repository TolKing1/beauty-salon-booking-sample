import {checkAuth, form, loadImages, toggleBurger} from "./js/config.js";
import {initializeOwlCarousel} from "./js/owl-carousel/owl.js";
import {formInteractive} from "./js/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    loadImages().then(initializeOwlCarousel);
    formInteractive()
    form()
    toggleBurger()
});
const Menu = {

    el: {
        ham: $('.menu'),
        menuTop: $('.menu-top'),
        menuMiddle: $('.menu-middle'),
        menuBottom: $('.menu-bottom')
    },

    init: function () {
        Menu.bindUIactions();
    },

    bindUIactions: function () {
        Menu.el.ham
            .on(
                'click',
                function (event) {
                    Menu.activateMenu(event);
                    event.preventDefault();
                }
            );
    },

    activateMenu: function () {
        Menu.el.menuTop.toggleClass('menu-top-click');
        Menu.el.menuMiddle.toggleClass('menu-middle-click');
        Menu.el.menuBottom.toggleClass('menu-bottom-click');
    }
};

Menu.init();