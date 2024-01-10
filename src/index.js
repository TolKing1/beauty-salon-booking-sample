import {checkAuth, form, loadImages, toggleBurger} from "./js/config.js";
import {initializeOwlCarousel} from "./js/owl.js";
import {formInteractive} from "./js/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    loadImages().then(initializeOwlCarousel);
    formInteractive()
    form()
    toggleBurger()
});

