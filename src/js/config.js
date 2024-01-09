import { getStorage,ref,listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut}  from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {isValidEmail, isValidPassword} from "./validate.js";

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
export const auth = getAuth(app);
export const storageRef = ref(storage, '/images/slider');


const formDiv = document.querySelector('.form__structor')
const exit = document.getElementById('exit__acc')
const title = document.querySelector(".form-title")


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
export function checkAuth() {
    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                resolve(true);
            } else {
                resolve(false);
            }
            unsubscribe();
        });
    });
}
export async function youAreLogged() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        title.innerText = "You have already logged"
    } else {
        title.innerText = "Sign in"
    }
}

function closeBtn(){
    const close = document.querySelector('.navbar__list-login')
    const closeForm = document.getElementById('close__btn')
    close.addEventListener('click', async function (e) {
        e.preventDefault()
        formDiv.classList.toggle("close-form");
        youAreLogged()

    })

    closeForm.addEventListener('click', function (e) {
        e.preventDefault()
        formDiv.classList.toggle("close-form");
        youAreLogged()
    })
}
function exitAcc() {
    exit.addEventListener('click',  async function (e) {
        e.preventDefault()
        const isAuthenticated = await checkAuth();
        if (isAuthenticated) {
            signOut(auth).then(function () {
                alert("You logged out")
                formDiv.classList.toggle("close-form");
            }).catch(function (error) {
                console.log(error.message)
            });

        }
    })
}
export function form(){
    closeBtn()
    exitAcc()
    youAreLogged()
    const form = document.getElementById('sign-form');
    const formLog = document.getElementById('log-form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = form.email.value;
        const pass = form.password.value;
        if (isValidEmail(email) && isValidPassword(pass)){
            createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    alert("Account created\n"+userCredential.user.email);
                    youAreLogged()
                })
                .catch((error) => {
                    alert(error.message)
                });
        }
    });
    formLog.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = formLog.email.value;
        const pass = formLog.password.value;

        if (isValidEmail(email) && isValidPassword(pass)){
            signInWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
                    alert("Welcome: " + userCredential.user.email);
                    youAreLogged()
                })
                .catch((error) => {
                    alert(error.message)
                });
        }

    });
}
export function toggleBurger(){
    const burger = document.querySelector('.navbar__toggle')
    const menu = document.querySelector('.navbar__list')
    burger.addEventListener('click',(e)=>{
        e.preventDefault()
        menu.classList.toggle("active")
    })
}