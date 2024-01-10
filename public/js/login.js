const loginFormHandler = async (event) => {
    event.preventDefault(event);
    console.log('logging in')

    const email = document.getElementById('email-login').value.trim();
    const password = document.getElementById('password-login').value.trim();

    console.log(email, password)
    

    // login route from controller
    if (email && password) {
        const response = await fetch ('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: { 'Content-Type': 'application/json' }
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
    console.log('signing up')

    const user_name = document.getElementById('username-signup').value.trim();
    const email = document.getElementById('email-signup').value.trim();
    const password = document.getElementById('password-signup').value.trim();
    const confirmPassword = document.getElementById('confirm-password-signup').value.trim();

    console.log(user_name, email, password, confirmPassword)

    if(password !== confirmPassword) {
        alert('Passwords do not match')
        return;
    } 

    // signup route from controller
    if (user_name && email && password) {
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({user_name, email, password}),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log(response.body)
        console.log(response)

        if (response.ok){
            document.location.replace('/');
        } else{
            alert('Failed to sign up')
            return;
        }
    }
}

// selects the button and adds the eventhandler
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signUpFormHandler);