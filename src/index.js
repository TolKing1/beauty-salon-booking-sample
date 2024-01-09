import {checkAuth, form, loadImages} from "./js/config.js";
import {initializeOwlCarousel} from "./js/owl-carousel/owl.js";
import {formInteractive} from "./js/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    loadImages().then(initializeOwlCarousel);
    formInteractive()
    form()
});