import { getStorage,ref,listAll, getDownloadURL } from "../dist/firebase/firebase-storage.js";
import { initializeApp } from "../dist/firebase/firebase-app.js";

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
    return new Promise((resolve, reject) => {
        listAll(storageRef)
            .then(function (result) {
                const promises = result.items.map(function (item) {
                    return getDownloadURL(item)
                        .then(function (url) {
                            let imgElement = document.createElement('img');
                            imgElement.alt = 'girl';
                            imgElement.src = url;

                            document.getElementById('carousel').append(imgElement);
                        })
                        .catch(function (error) {
                            console.error('Error getting download URL:', error);
                        });
                });

                Promise.all(promises)
                    .then(() => {
                        resolve(); // Resolve the promise when all images are loaded
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}
