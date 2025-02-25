const renderAnime = async function () {
  const baseURL = "https://kitsu.io/api/edge";
  const animeId = window.location.pathname;
  const paginationLimit = `page%5Blimit%5D=20`;
  const paginationOffset = `&page%5Boffset%5D=0`;

  // get's the relevant data of the clicked anime
  async function initialFetch() {
    const response = await fetch(`${baseURL}${animeId}`);
    const data = await response.json();
    return data.data.attributes;
  }

  // fetch the related media sources (ex. manga, sequels, spinoffs)
  async function getRelatedMedia() {
    let relatedMediaArray = [];
    let relatedMediaHTML = "";
    const relatedResponse = await fetch(
      `${baseURL}${animeId}/media-relationships?${paginationLimit}${paginationOffset}`
    );
    const relatedData = await relatedResponse.json();

    for (let i = 0; i < relatedData.data.length; i++) {
      // only adds specific related data (prevents overflow)
      if (
        // opting out of manga media (only showing anime)
        // relatedData.data[i].attributes.role == "adaptation" ||
        relatedData.data[i].attributes.role == "prequel" ||
        relatedData.data[i].attributes.role == "side_story" ||
        relatedData.data[i].attributes.role == "sequel" ||
        relatedData.data[i].attributes.role == "parent_story"
      ) {
        let relatedMediaLinkAndRole = [
          // gets the link for each of the related media source to do a fetch request for more details
          // also grabs the role in the media relationship (ex. sequel/spinoff)
          // capitalize the first letter of each word
          relatedData.data[i].attributes.role
            .replace("_", " ")
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(" "),
          relatedData.data[i].relationships.destination.links.self,
        ];
        relatedMediaArray.push(relatedMediaLinkAndRole);
      }
    }

    // fetch each related media sources data and renders a poster image and relationship text
    const renderRelatedMedia = async function () {
      for (let j = 0; j < relatedMediaArray.length; j++) {
        let relatedMediaResponse = await fetch(relatedMediaArray[j][1]);
        let relatedMediaData = await relatedMediaResponse.json();
        const res = await fetch(
          `https://kitsu.io/api/edge/${relatedMediaData.data.type}/${relatedMediaData.data.id}`
        );
        const data = await res.json();
        // does not include music videos or manga
        if (
          data.data.attributes.showType == undefined ||
          data.data.attributes.showType == "music"
        )
          return;
        else {
          let relatedMediaRole = relatedMediaArray[j][0];
          let tinyPosterImage = data.data.attributes.posterImage.tiny;
          let relatedMediaId = data.data.id;
          relatedMediaHTML += `<div style="cursor: pointer;" onclick="location.href=${relatedMediaId}" class="related-media-container">
      <img class="related-media-poster" src="${tinyPosterImage}" alt="" />
      <p class="related-media-role">${relatedMediaRole}</p>
    </div>`;
        }
      }
    };
    await renderRelatedMedia();
    return relatedMediaHTML;
  }

  //   get all the categories of the anime
  async function getCategories() {
    let categoryArray = [];
    let categoryHTML = "";
    const categoryResponse = await fetch(
      `${baseURL}${animeId}/categories?${paginationLimit}${paginationOffset}`
    );
    const categoryData = await categoryResponse.json();

    for (let i = 0; i < categoryData.data.length; i++) {
      let categoryTitleandCount = [
        categoryData.data[i].attributes.totalMediaCount,
        categoryData.data[i].attributes.title,
      ];
      categoryArray.push(categoryTitleandCount);
    }
    categoryArray = categoryArray.sort(function (a, b) {
      return b[0] - a[0];
    });

    // returns the top 6 categories by "media count"
    for (let i = 0; i < categoryArray.length; i++) {
      if (i < 7) categoryHTML += `<span>${categoryArray[i][1]}<br /></span>`;
    }

    return categoryHTML;
  }

  // storing return values of each function as a variable to pass to the HTML render function
  let anime = await initialFetch();
  let relatedMediaHTML = await getRelatedMedia();
  let categoryHTML = await getCategories();

  renderHTML(anime, categoryHTML, relatedMediaHTML);
};

renderAnime();

function renderHTML(anime, categoryHTML, relatedMediaHTML) {
  // checks the month the anime came out and returns a string that identifies the season
  function formatSeason() {
    let year = anime.startDate.slice(0, 4);
    switch (anime.startDate.slice(5, 7)) {
      case "01":
        return "Winter " + year;
      case "02":
        return "Winter " + year;
      case "03":
        return "Winter " + year;
      case "04":
        return "Spring " + year;
      case "05":
        return "Spring " + year;
      case "06":
        return "Spring " + year;
      case "07":
        return "Summer " + year;
      case "08":
        return "Summer " + year;
      case "09":
        return "Summer " + year;
      case "10":
        return "Fall " + year;
      case "11":
        return "Fall " + year;
      case "12":
        return "Fall " + year;
    }
  }

  let season = formatSeason();

  function formatDate(date) {
    // for ongoing animes
    if (!date) {
      return `Ongoing`;
    }
    let year = date.slice(0, 4);
    let month = date.slice(5, 7);
    let day = date.slice(8, 10);
    switch (month) {
      case "01":
        return `January ${day}, ${year}`;
      case "02":
        return `February ${day}, ${year}`;
      case "03":
        return `March ${day}, ${year}`;
      case "04":
        return `April ${day}, ${year}`;
      case "05":
        return `May ${day}, ${year}`;
      case "06":
        return `June ${day}, ${year}`;
      case "07":
        return `July ${day}, ${year}`;
      case "08":
        return `August ${day}, ${year}`;
      case "09":
        return `September ${day}, ${year}`;
      case "10":
        return `October ${day}, ${year}`;
      case "11":
        return `November ${day}, ${year}`;
      case "12":
        return `December ${day}, ${year}`;
    }
  }
  formatDate(anime.startDate);

  // looks for the nth occurence of a subString inside a string
  function formatSynopsis() {
    function indexOfParagraph(string, subString, index) {
      return string.split(subString, index).join(subString).length;
    }

    // finds the third "." inside the string and then splits the string into two parts
    // [LOOK INTO CREATING A FOR LOOP TO FIND EVERY 3RD OCCURENCE OF A PERIOD FOR LONGER SYNOPSES]
    let index = indexOfParagraph(anime.synopsis, ".", 3) + 1;

    return [
      anime.synopsis.substring(0, index),
      anime.synopsis.substring(index, anime.length),
    ];
  }

  let synopsis = formatSynopsis();

  document.querySelector(".content").innerHTML = `   
  <div class="header">
    <div class="header-container">
      <div class="image-container">
        <img src="${anime.posterImage.small}" alt="" class="anime-poster" />
      </div>
      <div class="synopsis-container">
      <hr class="line">
        <h5 class="anime-title">${anime.canonicalTitle}</h5>
        <p class="synopsis">${synopsis[0]} </br> </br> 
        ${synopsis[1]}</p>
      </div>
    </div>
      <div class="button-container">
        <button class="btn btn-primary list-btn">Add to List</button>
      </div>
  </div>
  <div class="content-container">
    <div class="info-container">
      <ul class="info-list">
        <li>Format</li>
        <span>${
          anime.showType.charAt(0).toUpperCase() + anime.showType.slice(1)
        }</span>
        <li>Episodes</li>
        <span>${anime.episodeCount}</span>
        <li>Episode Duration</li>
        <span>${anime.episodeLength} mins</span>
        <li>Status</li>
        <span>${
          anime.status.charAt(0).toUpperCase() + anime.status.slice(1)
        }</span>
        <li>Start Date</li>
        <span>${formatDate(anime.startDate)}</span>
        <li>End Date</li>
        <span>${formatDate(anime.endDate)}</span>
        <li>Season</li>
        <span>${season}</span>
        <li>Average Score</li>
        <span>${anime.averageRating}</span>
        <li>Popularity</li>
        <span>${anime.popularityRank}</span>
        <li>Categories</li>
        ${categoryHTML}
      </ul>
    </div>
    <div class="media-container">
      <div class="related-container">
      ${relatedMediaHTML}
      </div>
      <div class="video-container">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${
          anime.youtubeVideoId
        }">
        </iframe>
      </div>
    </div>
  </div>`;

  async function addToList(event) {
    console.log("test");
    // creates object that will be sent to backend and saved to user's list
    const animeToSave = {
      anime_title: document.querySelector(".anime-title").textContent,
      rating: 0,
      watch_status: "planning to watch",
    };
    event.preventDefault();
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
      } else if (response.status === 500) {
        alert("Anime is already in your list");
      } else {
        console.log("Error");
      }
    } else {
      console.log("Added to list");
    }
  }

  document.querySelector(".list-btn").addEventListener("click", addToList);
}
