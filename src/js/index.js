import { form, loadImages, toggleBurger} from "./util/config.js";
import {initializeOwlCarousel} from "./util/owl.js";
import {formInteractive} from "./util/validate.js";

document.addEventListener("DOMContentLoaded", function () {
    loadImages().then(initializeOwlCarousel);
    formInteractive()
    form()
    toggleBurger()
});

