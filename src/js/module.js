import {loadImages} from "./config.js";
import {initializeOwlCarousel} from "./script.js";

document.addEventListener("DOMContentLoaded", loadImages);
window.onload = function (){
    initializeOwlCarousel();
}