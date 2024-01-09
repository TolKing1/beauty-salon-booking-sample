import {loadImages} from "./config.js";
import {initializeOwlCarousel} from "./script.js";

document.addEventListener("DOMContentLoaded", function () {
    loadImages().then(initializeOwlCarousel);
});