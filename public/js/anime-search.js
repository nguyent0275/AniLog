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
    const response = await fetch(`/api/anime/search/${title}`, {
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
        // create
        const title = document.createElement("h2");
        const imageCard = document.createElement("img");
        const description = document.createElement("p");
        const addToListBtn = document.createElement("button");

        // attr
        title.textContent = animeData.data[index].attributes.canonicalTitle;
        imageCard.src = animeData.data[index].attributes.posterImage.tiny;
        description.textContent = animeData.data[index].attributes.description;
        addToListBtn.textContent = "Add to List";

        // append
        animeDiv.append(title);
        animeDiv.append(imageCard);
        animeDiv.append(description);
        animeDiv.append(addToListBtn);

        const animeToSave = { title: title.textContent };
        addToListBtn.addEventListener("click", async function (event) {
          event.preventDefault(event);
          const response = await fetch(`/api/status/add-to-list`, {
            method: "POST",
            body: JSON.stringify(animeToSave),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            // change to remove div if added to list OR indicate to user that anime is on their list
            console.log("added to list");
          } else {
            alert("failed to add to list");
          }
        });
      }
    }
  }
};

document.querySelector("anime-search-form");
document.addEventListener("submit", newFormHandler);
