window.addEventListener('load', () => {
    const sendEmail = document.getElementById('sendEmail');
    const errorField = document.getElementById('errorField');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    sendEmail.addEventListener('click', () => {
        let isValid = true;

        errorField.style.color = 'red';

        // check email
        if (email.value.trim().length === 0) {
            email.classList.add('errorInput');
            errorField.textContent = 'email must not be empty';
            isValid = false;
        } else {
            if (isEmailValid(email.value)) {
                email.classList.remove('errorInput');
            } else {
                email.classList.add('errorInput');
                errorField.textContent = 'invalid email';
                isValid = false;
            }
        }

        // check subject
        if (subject.value.trim().length === 0) {
            subject.classList.add('errorInput');
            errorField.textContent = 'subject must not be empty.';
            isValid = false;
        } else {
            subject.classList.remove('errorInput');
        }

        // check message
        if (message.value.trim().length === 0) {
            message.classList.add('errorInput');
            errorField.textContent = 'message must not be empty.';
            isValid = false;
        } else {
            message.classList.remove('errorInput');
        }
        
        if (isValid) {
            const xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {}
            xhttp.open('POST', './php/mail.php', true);
            xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            xhttp.send(`email=${email.value}&subject=${subject.value}&message=${message.value}`);
            
            xhttp.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    if (this.responseText.includes('true')) {
                        errorField.style.color = 'black';
                        errorField.textContent = 'email sent successfully';
                    } else {
                        errorField.textContent = 'email not sent';
                    }
                }
            }
        }
    });
});

function isEmailValid(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}