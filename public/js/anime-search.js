const newFormHandler = async (event) => {
  event.preventDefault(event);

  const title = document.querySelector("anime-name").value.trim();
  console.log(title)

  if (title) {
    const response = await fetch(`/api/anime/search/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // backend data now in the front end
    const animeData = await response.json();
    console.log(animeData);

    const animeDiv = document.querySelector(".anime-div");

    if (response.ok) {
      for (let index = 0; index < animeData.data.length; index++) {
        const title = document.createElement("h2");
        const imageCard = document.createElement("img");
        const description = document.createElement("p");

        title.textContent = animeData.data[index].attributes.canonicalTitle;
        imageCard.src = animeData.data[index].attributes.posterImage.tiny;
        description.textContent = animeData.data[index].attributes.description;

        animeDiv.append(title);
        animeDiv.append(imageCard);
        animeDiv.append(description);
      }
    }
  }
};

document.querySelector("anime-search-form");
document.addEventListener("submit", newFormHandler);
