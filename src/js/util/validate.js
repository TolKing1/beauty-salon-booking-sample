
export function isValidEmail(str) {
    // Your code
    if (!str || typeof str === 'undefined') {
        return false;
    } else {
        return /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/.test(str);
    }
}

export function isValidPassword(str) {
    // Your code
    if (!str || typeof str === 'undefined') {
        return false;
    } else {
        //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(str);
    }
}


export function formInteractive() {
    const loginBtn = document.getElementById('login');
    const signupBtn = document.getElementById('signup');

    loginBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
                signupBtn.parentNode.classList.remove('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });

    signupBtn.addEventListener('click', (e) => {
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                loginBtn.parentNode.parentNode.classList.remove('slide-up')
                parent.classList.add('slide-up')
            } else {
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    });
    //Validate
    const mail = document.getElementById('sign-mail')
    const password = document.getElementById('sign-password')

    const mailLog = document.getElementById('log-mail')
    const passwordLog = document.getElementById('log-password')

    mail.addEventListener("input", () => {
        if (isValidEmail(mail.value)) {
            mail.classList.remove("input-error")
        } else {
            mail.classList.add("input-error")
        }
    })
    password.addEventListener("input", () => {
        if (isValidPassword(password.value)) {
            password.classList.remove("input-error")
        } else {
            password.classList.add("input-error")
        }
    })
    mailLog.addEventListener("input", () => {
        if (isValidEmail(mailLog.value)) {
            mailLog.classList.remove("input-error")
        } else {
            mailLog.classList.add("input-error")
        }
    })
    passwordLog.addEventListener("input", () => {
        if (isValidPassword(passwordLog.value)) {
            passwordLog.classList.remove("input-error")
        } else {
            passwordLog.classList.add("input-error")
        }
    })

}

