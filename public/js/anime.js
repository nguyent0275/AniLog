$(document).ready(async function () {
  //   const baseUrl = "https://kitsu.io/api/edge";
  //   const categoryFilter = "/anime?filter[categories]=adventure";
  //   const textFilter = "/anime?filter[text]=";

  // array of api urls for fetches
  const apiFetchArray = [
    "https://kitsu.io/api/edge/anime?sort=ratingRank",
    "https://kitsu.io/api/edge/anime?sort=popularityRank",
    "https://kitsu.io/api/edge/anime?filter[categories]=romance",
    "https://kitsu.io/api/edge/anime?filter[subtype]=movie",
  ];

  // array of class names of the carousels from the home.handlebars
  const carouselCategoryArray = [".top", ".popular", ".romance", ".movie"];

  // function runs a fetch on one of the urls in the array and then runs a function for rendering html elements
  var apiData = null;

  async function apiFetchRequest(index) {
    let requestUrl = apiFetchArray[index];
    let response = await fetch(requestUrl);
    apiData = await response.json();
    console.log(apiData);
    return apiData;
  }

  // function for rendering the html element for each carousel
  const renderAnimeCarouselCards = (animeApiData, i) => {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      const animeDivEl = $("<div>");
      const animeImgContainer = $("<div>");
      const animeImgEl = $("<img>");
      const animeDivCaption = $("<div>");
      const animeCaption = $("<h5>");
      const addToListBtn = $("<button>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgContainer.addClass("anime-image-container");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      addToListBtn.addClass("hide-button");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      // if the anime has an english title in the api, we will use otherwise we will user the canonical title
      if (animeApiData.data[index].attributes.titles.en) {
        animeCaption.text(animeApiData.data[index].attributes.titles.en);
      } else {
        animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);
      }
      addToListBtn.text("Add to List");

      // appending elements
      $(carouselCategoryArray[i] + "-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgContainer);
      animeImgContainer.append(animeImgEl);
      animeImgContainer.append(addToListBtn);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);

      // adds the ability to directly add to list if use is logged in, if not logged in will redirect to the login page
      addToListBtn.on("click", async function (event) {
        const animeToSave = {
          anime_title: animeCaption.text(),
          rating: 0,
          watch_status: "watching",
        };
        console.log(animeToSave);
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
      });
    }
    $(`${carouselCategoryArray[i]}-anime-carousel`).slick({
      slidesToShow: 6,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    });
  };

  for (let index = 0; index < apiFetchArray.length; index++) {
    const data = await apiFetchRequest(index);
    renderAnimeCarouselCards(data, index);
  }
});
