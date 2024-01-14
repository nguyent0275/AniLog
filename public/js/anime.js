$(document).ready(function () {
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
  const apiFetchRequest = async (index) => {
    let requestUrl = apiFetchArray[index];
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(jsonData);
    renderAnimeCarouselCards(jsonData, index);
  };

  // function for rendering the html element for each carousel
  const renderAnimeCarouselCards = (animeApiData, i) => {
    for (let index = 0; index < animeApiData.data.length; index++) {
      console.log("test");
      // creating html elements
      const animeDivEl = $("<div>");
      const animeImgEl = $("<img>");
      const animeDivCaption = $("<div>");
      const animeCaption = $("<h5>");
      const addToListBtn = $("<button>");

      // setting attributes
      animeDivEl.addClass("anime-item");
      animeImgEl.addClass("anime-img");
      animeDivCaption.addClass("anime-caption");
      animeImgEl.attr(
        "src",
        animeApiData.data[index].attributes.posterImage.tiny
      );
      animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);
      addToListBtn.text("Add to List");

      // appending elements
      $(carouselCategoryArray[i] + "-anime-carousel").append(animeDivEl);
      animeDivEl.append(animeImgEl);
      animeDivEl.append(animeDivCaption);
      animeDivCaption.append(animeCaption);
      animeDivEl.append(addToListBtn);

      // adds the ability to directly add to list if use is logged in, if not logged in will redirect to the login page
      addToListBtn.on("click", async function (event) {
        const animeToSave = { anime_title: animeCaption.text() };
        console.log(animeToSave);
        event.preventDefault();
        const response = await fetch(`/api/status/save`, {
          method: "POST",
          body: JSON.stringify(animeToSave),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          console.log("added to list");
        } else {
          document.location.replace("/login");
        }
      });
    }
  };

  for (let index = 0; index < apiFetchArray.length; index++) {
    apiFetchRequest(index);
  }
      $(".anime-carousel").slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3500,
    });
});
