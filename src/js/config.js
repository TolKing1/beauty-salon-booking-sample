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
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
export const storageRef = ref(storage, '/images/slider');

export function loadImages() {
    listAll(storageRef)
        .then(function (result) {
            result.items.forEach(function (item) {
                getDownloadURL(item)
                    .then(function (url) {
                        // Create img element
                        let imgElement = document.createElement('img');
                        imgElement.alt = 'girl';
                        imgElement.src = url;
                        imgElement.loading = 'lazy'

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
