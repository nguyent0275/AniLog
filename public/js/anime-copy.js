$(document).ready(function () {
  //   const baseUrl = "https://kitsu.io/api/edge";
  //   const categoryFilter = "/anime?filter[categories]=adventure";
  //   const textFilter = "/anime?filter[text]=";

  async function searchByTopRated() {
    let requestUrl = "https://kitsu.io/api/edge/anime?sort=ratingRank";
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(requestUrl);
    renderTopAnime(jsonData);
  }

  async function renderTopAnime(animeApiData) {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      let animeDivEl = $("<div>");
      let animeImgEl = $("<img>");
      let animeDivCaption = $("<div>");
      let animeCaption = $("<h5>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

      // appending elements
      $(".top-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgEl);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);
    }
  }

  async function searchByPopularity() {
    let requestUrl = "https://kitsu.io/api/edge/anime?sort=popularityRank";
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(requestUrl);
    renderPopularAnime(jsonData);
    $(".anime-carousel").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    });
  }

  async function renderPopularAnime(animeApiData) {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      let animeDivEl = $("<div>");
      let animeImgEl = $("<img>");
      let animeDivCaption = $("<div>");
      let animeCaption = $("<h5>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

      // appending elements
      $(".popular-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgEl);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);
    }
  }

  async function searchByRomance() {
    let requestUrl =
      "https://kitsu.io/api/edge/anime?filter[categories]=romance";
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(requestUrl);
    renderRomanceAnime(jsonData);
  }

  async function renderRomanceAnime(animeApiData) {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      let animeDivEl = $("<div>");
      let animeImgEl = $("<img>");
      let animeDivCaption = $("<div>");
      let animeCaption = $("<h5>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

      // appending elements
      $(".romance-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgEl);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);
    }
  }

  async function searchByMovie() {
    let requestUrl = "https://kitsu.io/api/edge/anime?filter[subtype]=movie";
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(requestUrl);
    renderAnimeMovie(jsonData);
  }

  async function renderAnimeMovie(animeApiData) {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      let animeDivEl = $("<div>");
      let animeImgEl = $("<img>");
      let animeDivCaption = $("<div>");
      let animeCaption = $("<h5>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

      // appending elements
      $(".movie-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgEl);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);
    }
  }

  searchByPopularity();
  searchByTopRated();
  searchByMovie();
  searchByRomance();
});
