import { getStorage,ref,listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import {getAuth,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut}  from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import {getFirestore} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

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
export const db = getFirestore(app);
export const storageRef = ref(storage, '/images/slider');


const formDiv = document.querySelector('.form__structor')
const exit = document.getElementById('exit__acc')
const title = document.querySelector(".form-title")

//Load images from firebase to slider
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
//Changes title to you are logged
export async function youAreLogged() {
    const isAuthenticated = await checkAuth();
    if (isAuthenticated) {
        title.innerText = "You have already logged"
    } else {
        title.innerText = "Sign in"
    }
}

//Close button for forms
function closeBtn(){
    const close = document.querySelector('.navbar__list-login')
    const closeForm = document.getElementById('close__btn')
    close.addEventListener('click', async function (e) {
        e.preventDefault()
        formDiv.classList.toggle("close-form");
        await youAreLogged()

    })

    closeForm.addEventListener('click', async function (e) {
        e.preventDefault()
        formDiv.classList.toggle("close-form");
        await youAreLogged()
    })
}
//Exit
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

const formSign = document.getElementById('sign-form');
const formLog = document.getElementById('log-form');
//Sign Up
function signUp(){

    formSign.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = formSign.email.value;
        const pass = formSign.password.value;
        if (isValidEmail(email) && isValidPassword(pass)){
            createUserWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
                    alert("Account created\n" + userCredential.user.email);
                    await youAreLogged()
                })
                .catch((error) => {
                    alert(error.message)
                });
        }
    });
}
//Sign in
function signIn(){
    formLog.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = formLog.email.value;
        const pass = formLog.password.value;

        if (isValidEmail(email) && isValidPassword(pass)){
            signInWithEmailAndPassword(auth, email, pass)
                .then(async (userCredential) => {
                    alert("Welcome: " + userCredential.user.email);
                    await youAreLogged()
                })
                .catch((error) => {
                    alert(error.message)
                });
        }

    });
}
//Burger
export function toggleBurger(){
    const burger = document.querySelector('.navbar__toggle')
    const menu = document.querySelector('.navbar__list')
    burger.addEventListener('click',(e)=>{
        e.preventDefault()
        menu.classList.toggle("active")
    })
}
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
//
export function form() {
    signUp()
    signIn()
    closeBtn()
    exitAcc()
    youAreLogged().then(() => console.log(""))
    Menu.init();
}
