// const editListBtn = document.querySelector('.edit-button')
const editAnimeBox = document.getElementById("edit-anime-box");
const popup = document.getElementById("popup");

// create edit anime box
const editAnimeDiv = document.createElement("div");
const titleHeader = document.createElement("h4");
const animeTitle = document.createElement("p");
const watchStatusDropDownLabel = document.createElement("label");
const watchStatusDropDownSelect = document.createElement("select");
const ratingsDropDownLabel = document.createElement("label");
const ratingsDropDownSelect = document.createElement("select");
const doneBtn = document.createElement("button");
const deleteAnimeBtn = document.createElement("button");

// attr
titleHeader.textContent = "Anime Title: ";
animeTitle.setAttribute("class", "edit-anime-title");
watchStatusDropDownLabel.setAttribute("class", "watch-label");
watchStatusDropDownLabel.textContent = "Watch Status";
watchStatusDropDownSelect.setAttribute("id", "watch-status");
watchStatusDropDownSelect.setAttribute("name", "watch-status");
ratingsDropDownLabel.setAttribute("class", "rating-label");
ratingsDropDownLabel.textContent = "Rating";
ratingsDropDownSelect.setAttribute("id", "rating");
ratingsDropDownSelect.setAttribute("name", "ratings");
doneBtn.setAttribute("id", "done-edit-button");
doneBtn.textContent = "Done";
deleteAnimeBtn.setAttribute("id", "delete-anime-button");
deleteAnimeBtn.textContent = "Delete";

// append
editAnimeBox.append(editAnimeDiv);
editAnimeDiv.append(titleHeader);
editAnimeDiv.append(watchStatusDropDownLabel);
editAnimeDiv.append(ratingsDropDownLabel);
watchStatusDropDownLabel.append(watchStatusDropDownSelect);
ratingsDropDownLabel.append(ratingsDropDownSelect);
editAnimeDiv.append(doneBtn);
editAnimeDiv.append(deleteAnimeBtn);

// done button that sends the updated information to backend to save
doneBtn.addEventListener("click", async function (event) {
  popup.classList.remove("open-popup");
  // send data to backend as well
  const animeToUpdate = {
    anime_title: animeTitle.innerHTML,
    rating: ratingsDropDownSelect.value,
    watch_status: watchStatusDropDownSelect.value,
  };
  console.log(animeToUpdate);
  event.preventDefault();
  const response = await fetch(`api/status/update`, {
    method: "PUT",
    body: JSON.stringify(animeToUpdate),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("updated list");
    location.reload();
  } else {
    console.log("error");
  }
  // clears anime title on done
  animeTitle.innerHTML = "";
});

deleteAnimeBtn.addEventListener("click", async function (event) {
  event.preventDefault();
  const animeToDelete = {
    anime_title: animeTitle.innerHTML,
  };
  console.log(animeToDelete);
  const response = await fetch(`/api/status/delete`, {
    method: "DELETE",
    body: JSON.stringify(animeToDelete),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("Anime deleted");
    location.reload();
  } else {
    console.log("error");
  }
});

// creates the dropdown menus for watch status
const watchStatusArray = [
  "planning to watch",
  "watching",
  "completed",
  "dropped",
];
for (let index = 0; index < watchStatusArray.length; index++) {
  const watchStatusOptions = document.createElement("option");
  watchStatusOptions.setAttribute("value", watchStatusArray[index]);
  watchStatusOptions.textContent = watchStatusArray[index];
  watchStatusDropDownSelect.append(watchStatusOptions);
}

// creates the dropdown menu for ratings
const ratingsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let index = 0; index < ratingsArray.length; index++) {
  const ratingsOptions = document.createElement("option");
  ratingsOptions.setAttribute("value", ratingsArray[index]);
  ratingsOptions.textContent = ratingsArray[index];
  ratingsDropDownSelect.append(ratingsOptions);
}

// returning an array with all the table rows
// using this as a length for a for loop to create edit buttons
const tableRows = document.querySelectorAll("tr");

// creating edit and delete buttons for each row of anime data
for (let index = 0; index < tableRows.length; index++) {
  const editListBtn = document.createElement("button");
  const buttonIndex = document.getElementById("button-" + index);
  editListBtn.textContent = "Edit";
  buttonIndex.append(editListBtn);

  editListBtn.addEventListener("click", function () {
    popup.classList.add("open-popup");
    animeTitle.textContent = document.getElementById(
      "title-" + index
    ).innerHTML;
    titleHeader.append(animeTitle);
  });
}
