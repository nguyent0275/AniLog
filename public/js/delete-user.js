const deleteUser = async (event) => {
  if (confirm("Are you sure you want to delete your account?")) {
    event.preventDefault();
    console.log("Deleting user");

    // add the controller route for the delete user by session id
    const response = await fetch("/api/user/delete", {
      method: "DELETE",
    });

    if (response.ok) {
      // takes back to homepage after the delete
      document.location.replace("/");
    } else {
      alert("Error in deleting user");
    }
  } else {
    return;
  }
};

// selects button by id and adds functionality
document.querySelector("#delete-user").addEventListener("click", deleteUser);
