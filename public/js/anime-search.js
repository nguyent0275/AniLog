const animeDiv = document.querySelector(".anime-div");

const searchAnime = async function () {
  //   clears the html after each search
  animeDiv.innerHTML = "";

  //   getting the user value from the search bar
  const title = document.querySelector(".anime-name").value.trim();
  console.log(title);

  await formHandler(title);
};

const formHandler = async (title) => {
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
        // need to create elements for what get stored into user list
        const animeApiData = animeData.data[index].attributes;
        // create
        const individualAnimeDiv = document.createElement("div");
        const titleDiv = document.createElement("div");
        const title = document.createElement("h5");
        const imageContainer = document.createElement("div");
        const imageCard = document.createElement("img");

        // attr
        individualAnimeDiv.setAttribute("class", "anime-item");
        titleDiv.setAttribute("class", "anime-caption");
        if (animeApiData.titles.en) {
          title.textContent = animeApiData.titles.en;
        } else {
          title.textContent = animeApiData.canonicalTitle;
        }
        imageContainer.setAttribute("class", "anime-image-container");
        imageCard.src = animeApiData.posterImage.tiny;

        // append
        animeDiv.append(individualAnimeDiv);
        individualAnimeDiv.append(imageContainer);
        imageContainer.append(imageCard);
        imageContainer.append(titleDiv);
        titleDiv.append(title);
      }
    }
  }
};

// Set timer in between keystrokes to prevent mass population of screen
// Will start reading the title after the user is done typing
var typingTimer; //timer identifier
var doneTypingInterval = 100; //time in ms

const searchBar = document.querySelector("input");
searchBar.addEventListener("keyup", function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchAnime, doneTypingInterval);
});

searchBar.addEventListener("keydown", function () {
  clearTimeout(typingTimer);
});
