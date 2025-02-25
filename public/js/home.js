//   const baseUrl = "https://kitsu.io/api/edge";
//   const categoryFilter = "/anime?filter[categories]=adventure";
//   const textFilter = "/anime?filter[text]=";

// array of api urls for fetches
const apiFetchArray = [
  // "https://kitsu.io/api/edge/anime?sort=ratingRank",
  "https://kitsu.io/api/edge/anime?sort=popularityRank",
  "https://kitsu.io/api/edge/anime?filter[categories]=romance",
  "https://kitsu.io/api/edge/anime?filter[categories]=sports",
  "https://kitsu.io/api/edge/anime?filter[categories]=shoujo",
  "https://kitsu.io/api/edge/anime?filter[subtype]=movie",
];

// array of class names of the carousels from the home.handlebars
const carouselCategoryArray = [
  ".top",
  ".popular",
  ".romance",
  ".sports",
  ".shoujo",
  ".movie",
];

const renderTop10Anime = async function () {
  let top10Div = document.querySelector(".top-10");
  let res = await fetch("https://kitsu.io/api/edge/anime?sort=ratingRank");
  let data = await res.json();
  console.log(data.length);
  for (let i = 0; i < data.data.length; i++) {
    let anime = data.data[i];
    console.log(anime);

    top10Div.insertAdjacentHTML(
      "beforeend",
      `<div class="top-anime-div">
        <span class="ranking" id="rank-${i + 1}" >${i + 1}</span>
        <img class="top-10-img" src="${anime.attributes.posterImage.tiny}"/>
        <div class="anime-info">
        <p>${anime.attributes.titles.en}</p>
        <small>${anime.attributes.showType} </br> ${
        anime.attributes.episodeCount
      } episodes </br> ${anime.attributes.averageRating} </br>
        </small>
        </div>
      </div>`
    );
  }
};

renderTop10Anime();

// adds the ability to directly add to list if use is logged in, if not logged in will redirect to the login page
// addToListBtn.on("click", async function (event) {
//   const animeToSave = {
//     anime_title: animeCaption.text(),
//     rating: 0,
//     watch_status: "planning to watch",
//   };
//   event.preventDefault();
//   const response = await fetch(`/api/status/save`, {
//     method: "POST",
//     body: JSON.stringify(animeToSave),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!response.ok) {
//     if (response.status === 401) {
//       console.log("User is not logged in");
//       window.location.replace("/login");
//     } else if (response.status === 500) {
//       alert("Anime is already in your list");
//     } else {
//       console.log("Error");
//     }
//   } else {
//     console.log("Added to list");
//   }
// });
