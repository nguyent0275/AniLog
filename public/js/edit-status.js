const renderTable = function () {
  const editAnimeBox = document.getElementById("edit-anime-box");

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

  deleteAnimeBtn.addEventListener("click", deleteAnime);
  doneBtn.addEventListener("click", updateAnime);

  const popup = document.getElementById("popup");

  // done button that sends the updated information to backend to save
  async function updateAnime(event) {
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
  }

  async function deleteAnime(event) {
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
  }

  function createEditBtn() {
    // returning an array with all the table rows
    // using this as a length for a for loop to create edit buttons
    const tableRows = document.querySelectorAll("tr");

    // creating edit and delete buttons for each row of anime data
    for (let index = 0; index < tableRows.length - 1; index++) {
      const editListIcon = document.createElement("i");
      editListIcon.setAttribute("class", "fa fa-pencil");
      const iconIndex = document.getElementById("i-" + index);
      iconIndex.append(editListIcon);

      editListIcon.addEventListener("click", function () {
        popup.classList.add("open-popup");
        animeTitle.textContent = document.getElementById(
          "title-" + index
        ).innerHTML;
        titleHeader.append(animeTitle);
      });
    }
  }

  // creates the dropdown menus for watch status
  function createDropDowns() {
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
  }
  createEditBtn();
  createDropDowns();

  // FILTERING TABLE
  let table = document.querySelector(".table");
  let input = document.getElementById("filter-title");
  input.addEventListener("keydown", filterByTitle);
  input.addEventListener("keyup", filterByTitle);

  // filters by title based on user input
  function filterByTitle() {
    let filter = input.value.toUpperCase();
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  // filters by the user's watch progress based on clickable elements
  function filterByProgress(progress) {
    if (progress == "all") progress = "";
    let tr = table.getElementsByTagName("tr");

    for (let i = 0; i < tr.length; i++) {
      let td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(progress) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  document.querySelector(".progress-filters").addEventListener("click", (e) => {
    if (e.target.tagName == "LI") {
      filterByProgress(e.target.innerHTML.toLowerCase());
    }
  });

  function sortTable(n) {
    // n is the table column index
    // 0 is title
    // 1 is score
    // 2 is progress
    let rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];

        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        // if the value is a string then turn all the letters to lowercase and check
        if (typeof x.innerHTML == "string") {
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              // If so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        // if value is a number than just sort from highest or lowest
        else if (typeof x.innerHTML == "number") {
          if (dir == "asc") {
            if (x.innerHTML > y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML < y.innerHTML) {
              shouldSwitch = true;
              break;
            }
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  let titleSort = document.getElementById("title");
  let titleRowIndex = titleSort.dataset.row;
  let scoreSort = document.getElementById("score");
  let scoreRowIndex = scoreSort.dataset.row;
  let progressSort = document.getElementById("progress");
  let progressRowIndex = progressSort.dataset.row;

  // adding sort function to the headers of each column
  titleSort.addEventListener("click", function () {
    sortTable(titleRowIndex);
  });
  progressSort.addEventListener("click", function () {
    sortTable(progressRowIndex);
  });
  scoreSort.addEventListener("click", function () {
    sortTable(scoreRowIndex);
  });
};

renderTable();
