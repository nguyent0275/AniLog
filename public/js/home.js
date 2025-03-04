let spinningLoader = document.querySelector(".loader");
let mainDiv = document.querySelector(".main");
mainDiv.style.display = "none";
spinningLoader.style.display = "block";

const getCurrentYearAndMonth = function () {
  let year = new Date().getFullYear();
  let month = new Date().getMonth();
  let season;
  if (month <= 3) {
    season = "winter";
  } else if (month > 3 && month <= 6) {
    season = "spring";
  } else if (month > 6 && month <= 9) {
    season = "summer";
  } else if (month > 9 && month <= 12) {
    season = "fall";
  }
  return [year, month, season];
};

const renderSpinningLoader = async function () {
  if (document.querySelector(".thumbnail")) {
    spinningLoader.style.display = "none";
    document.querySelector(".main").style.display = "flex";
  }
};

/*
Most Popular
Upcoming Season
Popular Airing
*/
const fetchCarouselData = async function () {
  const fetchMostPopular = async function (params) {
    let res = await fetch(
      `https://kitsu.io/api/edge/anime?sort=popularityRank`
    );
    let data = await res.json();
    return data.data;
  };

  const fetchUpcomingSeason = async function (params) {
    let nextSeason;
    let [year, month, season] = getCurrentYearAndMonth();
    // finds the next season based on current season
    switch (season) {
      case "winter":
        nextSeason = "spring";
        break;
      case "spring":
        nextSeason = "summer";
      case "summer":
        nextSeason = "fall";
      case "fall":
        nextSeason = "winter";
    }
    let res = await fetch(
      `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&filter[season]=${nextSeason}`
    );
    let data = await res.json();
    return data.data;
  };

  const fetchPopularAiring = async function () {
    let res = await fetch(
      `https://kitsu.io/api/edge/anime?sort=popularityRank&filter[status]=current`
    );
    let data = await res.json();
    return data.data;
  };

  let mostPopular = await fetchMostPopular();
  let upcomingSeason = await fetchUpcomingSeason();
  let popularAiring = await fetchPopularAiring();

  return [mostPopular, upcomingSeason, popularAiring];
};

const renderCarousel = async function () {
  let [mostPopular, upcomingSeason, popularAiring] = await fetchCarouselData();

  // for loop for creating carousel and carousel items for each category and anime
  for (let i = 0; i < mostPopular.length; i++) {
    document.querySelector(".most-popular section").insertAdjacentHTML(
      "beforeend",
      `<div class="thumbnail">
          <img src="${mostPopular[i].attributes.posterImage.tiny}" alt="" />
          <div class="product-details">
            <a href="#">Add to List</a>
          </div>
        </div>`
    );
  }

  for (let i = 0; i < upcomingSeason.length; i++) {
    document.querySelector(".upcoming section").insertAdjacentHTML(
      "beforeend",
      `<div class="thumbnail">
          <img src="${upcomingSeason[i].attributes.posterImage.tiny}" alt="" />
          <div class="product-details">
            <a href="#">Add to List</a>
          </div>
        </div>`
    );
  }

  for (let i = 0; i < popularAiring.length; i++) {
    document.querySelector(".popular-airing section").insertAdjacentHTML(
      "beforeend",
      `<div class="thumbnail">
          <img src="${popularAiring[i].attributes.posterImage.tiny}" alt="" />
          <div class="product-details">
            <a href="#">Add to List</a>
          </div>
        </div>`
    );
  }
};

const renderHeroSlider = async function () {
  let heroSlider = document.querySelector(".hero");
  let [year, month, season] = getCurrentYearAndMonth();

  let res = await fetch(
    `https://kitsu.io/api/edge/anime?filter[seasonYear]=${year}&filter[season]=${season}&sort=popularityRank&page[limit]=20`
  );
  let data = await res.json();

  let airingAnime = data.data;
  for (let i = 0; i < airingAnime.length; i++) {
    let bannerImg;
    let title;
    if (airingAnime[i].attributes.coverImage) {
      bannerImg = airingAnime[i].attributes.coverImage.large;
      if (!airingAnime[i].attributes.titles.en) {
        title = airingAnime[i].attributes.canonicalTitle;
      } else {
        title = airingAnime[i].attributes.titles.en;
      }
      heroSlider.insertAdjacentHTML(
        "beforeend",
        `
      <div id='slide-${i + 1}' class="slide" data-id="${airingAnime[i].id}">
        <img class="banner-img" src="${bannerImg}" alt="" />
        <div class="content">
          <h3 class="banner-title">${title}</h3>
        </div>
      </div>
    `
      );
    }
  }

  let slide1 = document.getElementById("slide-1");
  const slides = document.querySelectorAll(".slide");
  const next = document.querySelector(".next");
  const prev = document.querySelector(".prev");
  let autoScroll = true;
  let slideInterval;
  let intervalTime = 5000;
  // makes the first slide the active/current one
  slide1.classList.add("current");

  heroSlider.addEventListener("click", (e) => {
    let currentAnimeId = document.querySelector(".current").dataset.id;
    window.location.href = `/anime/${currentAnimeId}`;
  });

  const nextSlide = function () {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.nextElementSibling) {
      current.nextElementSibling.classList.add("current");
    } else {
      slides[0].classList.add("current");
    }
    current.classList.remove("current");
  };

  const prevSlide = function () {
    const current = document.querySelector(".current");
    current.classList.remove("current");
    if (current.previousElementSibling) {
      current.previousElementSibling.classList.add("current");
    } else {
      slides[slides.length - 1].classList.add("current");
    }
    current.classList.remove("current");
  };

  next.addEventListener("click", () => {
    nextSlide();
    if (autoScroll) {
      clearInterval(slideInterval);
      auto();
    }
  });
  prev.addEventListener("click", () => {
    prevSlide();
    if (autoScroll) {
      clearInterval(slideInterval);
      auto();
    }
  });

  if (autoScroll) {
    function auto() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }
  }

  auto();
};

const renderTop10Anime = async function () {
  let top10Div = document.querySelector(".top-10");
  let res = await fetch("https://kitsu.io/api/edge/anime?sort=ratingRank");
  let data = await res.json();
  for (let i = 0; i < data.data.length; i++) {
    let anime = data.data[i];

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

async function render() {
  await renderCarousel();
  await renderHeroSlider();
  await renderTop10Anime();
  await renderSpinningLoader();
}
render();

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
