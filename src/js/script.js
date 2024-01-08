import { getStorage,ref,listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";


const firebaseConfig = {
    apiKey: "AIzaSyBmVFcgSM9FtDXYId4XcQoJKep3K7uDxCg",
    authDomain: "beauty-268c5.firebaseapp.com",
    projectId: "beauty-268c5",
    storageBucket: "beauty-268c5.appspot.com",
    messagingSenderId: "307850780217",
    appId: "1:307850780217:web:68fa00e2bb87c0c2ebb7e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const storageRef = ref(storage, '/images/slider');

function loadImages() {
    listAll(storageRef)
        .then(function (result) {
            result.items.forEach(function (item) {
                getDownloadURL(item)
                    .then(function (url) {
                        // Create img element
                        let imgElement = document.createElement('img');
                        imgElement.alt = 'girl';
                        imgElement.src = url;

                        // Append the img element to the slider
                        document.querySelector('.owl-carousel').appendChild(imgElement);
                    })
                    .catch(function (error) {
                        console.error('Error getting download URL:', error);
                    });
            });
        })
        .catch(function (error) {
            console.error('Error getting images from Firebase Storage:', error);
        });
}
function initializeOwlCarousel() {
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
document.addEventListener("DOMContentLoaded", loadImages);
window.onload = function (){
    initializeOwlCarousel();
}

