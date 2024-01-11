const deleteUser = async (event) => {
    event.preventDefault()
    console.log('Deleting user')

    // add the controller route for the delete user by session id
    const response = await fetch('')

}

    if (response.ok) {
        // takes back to homepage after the delete
        document.location.replace('/')
    } else {
        alert('Error in deleting user')
    }

// selects button by id and adds functionality 
document
    .querySelector('#delete-user')
    .addEventListener('submit', deleteUser)