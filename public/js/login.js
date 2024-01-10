const loginFormHandler = async (event) => {
    event.preventDefault(event);

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch (`/api/user/login`, {
            method: `POST`,
            body: JSON.stringify({email, password}),
            headers: { 'Content Type' : 'application/json'}
        })

        if (response.ok) {
            document.location.replace('/');
        }
        else {
            alert('Failed to Login')
        }
    }
};

const signUpFormHandler = async (event) => {
    event.preventDefault(event);

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const confirmPassword = document.querySelector('#confirm-password-signup').value.trim();

    if(password !== confirmPassword) {
        alert('Passwords do not match')
    } 

    if (username && email && password) {
        const response = await fetch (`/api/users`, {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type' : 'application/json'}
        });

        if (response.ok){
            document.location.replace('/');
        } else{
            alert('Failed to sign up')
        }
    }
}