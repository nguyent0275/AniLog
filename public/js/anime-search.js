const newFormHandler = async (event) => {
  event.preventDefault(event);

  //   getting the user value from the search bar
  const title = document.querySelector(".anime-name").value.trim();
  console.log(title);

  const animeDiv = document.querySelector(".anime-div");

  //   clears the html after each search
  while (animeDiv.hasChildNodes()) {
    animeDiv.removeChild(animeDiv.firstChild);
  }

  //   if there is a value, run the function
  if (title) {
    // calling the route in the controller, which fields the third party api call
    // data is retrieved from third party api and sent back to the front end
    const response = await fetch(`/search/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // backend data now in the front end
    const animeData = await response.json();
    console.log(animeData);

    // if the response returned successfully, run the function
    if (response.ok) {
      for (let index = 0; index < animeData.data.length; index++) {
        // need to create elements for what get stored into user list (i.e ratings dropdown, watching status dropdown, and imagecard?)
        const animeApiData = animeData.data[index].attributes;
        // create
        const individualAnimeDiv = document.createElement("div");
        const title = document.createElement("h2");
        const imageContainer = document.createElement("div");
        const imageCard = document.createElement("img");
        const animeInfo = document.createElement("ul");
        const description = document.createElement("p");
        const editAnimeDiv = document.createElement("div");
        const addToListBtn = document.createElement("button");
        const watchStatusDropDownLabel = document.createElement("label");
        const watchStatusDropDownSelect = document.createElement("select");
        const ratingsDropDownLabel = document.createElement("label");
        const ratingsDropDownSelect = document.createElement("select");

        // attr
        individualAnimeDiv.setAttribute("class", "anime-container");
        if (animeApiData.titles.en) {
          title.textContent = animeApiData.titles.en;
        } else {
          title.textContent = animeApiData.canonicalTitle;
        }
        imageContainer.setAttribute("class", "img-container");
        imageCard.src = animeApiData.posterImage.tiny;
        animeInfo.setAttribute("id", "info-list-" + index);
        animeInfo.setAttribute("class", "info-ul");
        description.textContent = animeApiData.description;
        editAnimeDiv.setAttribute("class", "edit-container");
        addToListBtn.textContent = "Add to List";
        watchStatusDropDownLabel.textContent = "Watch Status";
        watchStatusDropDownSelect.setAttribute("id", "watch-status-" + index);
        watchStatusDropDownSelect.setAttribute("name", "watch-status");
        ratingsDropDownLabel.textContent = "Rating";
        ratingsDropDownSelect.setAttribute("id", "rating-" + index);
        ratingsDropDownSelect.setAttribute("name", "ratings");

        // append
        animeDiv.append(individualAnimeDiv);
        individualAnimeDiv.append(title);
        individualAnimeDiv.append(imageContainer);
        imageContainer.append(imageCard);
        imageContainer.append(animeInfo);
        imageContainer.append(editAnimeDiv);
        individualAnimeDiv.append(description);
        editAnimeDiv.append(addToListBtn);
        editAnimeDiv.append(watchStatusDropDownLabel);
        editAnimeDiv.append(ratingsDropDownLabel);
        watchStatusDropDownLabel.append(watchStatusDropDownSelect);
        ratingsDropDownLabel.append(ratingsDropDownSelect);

        // creating additional list of anime information
        const animeInfoNameArray = [
          "Episodes: ",
          "Airing Status: ",
          "Popularity Rank: ",
          "Subtype: ",
          "Average Rating: ",
        ];
        const animeInfoArray = [
          animeApiData.episodeCount,
          animeApiData.status,
          animeApiData.popularityRank,
          animeApiData.subtype,
          animeApiData.averageRating,
        ];
        for (let index = 0; index < animeInfoArray.length; index++) {
          const animeInfoList = document.createElement("li");
          animeInfoList.setAttribute("class", "info-li");
          animeInfoList.textContent =
            animeInfoNameArray[index] + animeInfoArray[index];
          animeInfo.append(animeInfoList);
        }

        // creating the watch status dropdown
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

        // creating the ratings drop down
        const ratingsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        for (let index = 0; index < ratingsArray.length; index++) {
          const ratingsOptions = document.createElement("option");
          ratingsOptions.setAttribute("value", ratingsArray[index]);
          ratingsOptions.textContent = ratingsArray[index];
          ratingsDropDownSelect.append(ratingsOptions);
        }

        addToListBtn.addEventListener("click", async function (event) {
          const animeToSave = {
            anime_title: title.textContent,
            rating: ratingsDropDownSelect.value,
            watch_status: watchStatusDropDownSelect.value,
          };
          console.log(animeToSave);
          event.preventDefault(event);
          const response = await fetch(`/api/status/save`, {
            method: "POST",
            body: JSON.stringify(animeToSave),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            if (response.status === 401) {
              console.log("User is not logged in");
              window.location.replace("/login");
            } else {
              console.log("Error");
            }
          } else {
            console.log("Added to list");
          }
        });
      }
    }
  }
};

document.querySelector("anime-search-form");
document.addEventListener("submit", newFormHandler);
