<<<<<<< HEAD
// $(document).ready(function () {
//   const baseUrl = "https://kitsu.io/api/edge";
//   const categoryFilter = "/anime?filter[categories]=adventure";
//   const textFilter = "/anime?filter[text]=";

//   async function getSearchQuery(event) {
//     await event.preventDefault();
//     let searchQuery = $(".search-bar").val();
//     await searchByInput(searchQuery);
//   }

//   async function searchByInput(query) {
//     let newUrl = baseUrl + textFilter;
//     let queryParameters = new URLSearchParams(query);
//     let requestUrl = newUrl + queryParameters;

//     let response = await fetch(requestUrl);
//     let jsonData = await response.json();
//     console.log(requestUrl);
//     console.log(jsonData);
//     await renderSearch(jsonData)
//   }

//   $(".btn").on("click", getSearchQuery)

//   async function renderSearch(animeApiData) {
//     console.log(animeApiData);
//     let mainContainer = $('#main-container')
//     mainContainer.children().remove();


//     for (let index = 0; index < animeApiData.data.length; index++) {
//         console.log('test')
//         // create
//         let animeDivContainer = $('<div>')
//         let animeImgCard = $('<img>')
//         let listButton = $('<button>')
//         let animeDescContainer = $('<div>')
//         let animeTitle = $('<h3>')
//         let animeDescription = $('<p>')

//         // attr
//         animeDivContainer.addClass('div-container');
//         animeDescContainer.addClass('div-container');
//         animeImgCard.attr('src', animeApiData.data[index].attributes.posterImage.tiny)
//         listButton.text('Add to List')
//         animeTitle.text(animeApiData.data[index].attributes.canonicalTitle)
//         animeDescription.text(animeApiData.data[index].attributes.description)

//         // append
//         mainContainer.append(animeDivContainer)
//         animeDivContainer.append(animeImgCard)
//         animeDivContainer.append(listButton)
//         animeDivContainer.append(animeDescContainer)
//         animeDescContainer.append(animeTitle)
//         animeDescContainer.append(animeDescription)
//     };
//   };

//   async function searchByTopRated() {
//     let requestUrl = "https://kitsu.io/api/edge/anime?sort=ratingRank";
//     let response = await fetch(requestUrl);
//     let jsonData = await response.json();
//     console.log(requestUrl);
//     renderTopAnime(jsonData);
//   }

//   async function renderTopAnime(animeApiData) {
//     for (let index = 0; index < animeApiData.data.length; index++) {
//       console.log("test");
//       // creating html elements
//       let animeDivEl = $("<div>");
//       let animeImgEl = $("<img>");
//       let animeDivCaption = $("<div>");
//       let animeCaption = $("<h5>");

//       // setting attributes
//       animeDivEl.addClass("anime-item");
//       animeImgEl.addClass("anime-img");
//       animeDivCaption.addClass("anime-caption");
//       animeImgEl.attr(
//         "src",
//         animeApiData.data[index].attributes.posterImage.tiny
//       );
//       animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

//       // appending elements
//       $(".top-anime-carousel").append(animeDivEl);
//       animeDivEl.append(animeImgEl);
//       animeDivEl.append(animeDivCaption);
//       animeDivCaption.append(animeCaption);
//     }
//   }

//   async function searchByPopularity(param) {
//     let requestUrl = "https://kitsu.io/api/edge/anime?sort=popularityRank";
//     let response = await fetch(requestUrl);
//     let jsonData = await response.json();
//     console.log(requestUrl);
//     renderPopularAnime(jsonData);
//     $(".anime-carousel").slick({
//       slidesToShow: 5,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 3500,
//     });
//   }

//   async function renderPopularAnime(animeApiData) {
//     for (let index = 0; index < animeApiData.data.length; index++) {
//       console.log("test");
//       // creating html elements
//       let animeDivEl = $("<div>");
//       let animeImgEl = $("<img>");
//       let animeDivCaption = $("<div>");
//       let animeCaption = $("<h5>");

//       // setting attributes
//       animeDivEl.addClass("anime-item");
//       animeImgEl.addClass("anime-img");
//       animeDivCaption.addClass("anime-caption");
//       animeImgEl.attr(
//         "src",
//         animeApiData.data[index].attributes.posterImage.tiny
//       );
//       animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

//       // appending elements
//       $(".popular-anime-carousel").append(animeDivEl);
//       animeDivEl.append(animeImgEl);
//       animeDivEl.append(animeDivCaption);
//       animeDivCaption.append(animeCaption);
//     }
//   }

//   async function searchByRomance(param) {
//     let requestUrl =
//       "https://kitsu.io/api/edge/anime?filter[categories]=romance";
//     let response = await fetch(requestUrl);
//     let jsonData = await response.json();
//     console.log(requestUrl);
//     renderRomanceAnime(jsonData);
//   }

//   async function renderRomanceAnime(animeApiData) {
//     for (let index = 0; index < animeApiData.data.length; index++) {
//       console.log("test");
//       // creating html elements
//       let animeDivEl = $("<div>");
//       let animeImgEl = $("<img>");
//       let animeDivCaption = $("<div>");
//       let animeCaption = $("<h5>");

//       // setting attributes
//       animeDivEl.addClass("anime-item");
//       animeImgEl.addClass("anime-img");
//       animeDivCaption.addClass("anime-caption");
//       animeImgEl.attr(
//         "src",
//         animeApiData.data[index].attributes.posterImage.tiny
//       );
//       animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

//       // appending elements
//       $(".romance-anime-carousel").append(animeDivEl);
//       animeDivEl.append(animeImgEl);
//       animeDivEl.append(animeDivCaption);
//       animeDivCaption.append(animeCaption);
//     }
//   }

//   async function searchByMovie(param) {
//     let requestUrl = "https://kitsu.io/api/edge/anime?filter[subtype]=movie";
//     let response = await fetch(requestUrl);
//     let jsonData = await response.json();
//     console.log(requestUrl);
//     renderAnimeMovie(jsonData);
//   }

//   async function renderAnimeMovie(animeApiData) {
//     for (let index = 0; index < animeApiData.data.length; index++) {
//       console.log("test");
//       // creating html elements
//       let animeDivEl = $("<div>");
//       let animeImgEl = $("<img>");
//       let animeDivCaption = $("<div>");
//       let animeCaption = $("<h5>");

//       // setting attributes
//       animeDivEl.addClass("anime-item");
//       animeImgEl.addClass("anime-img");
//       animeDivCaption.addClass("anime-caption");
//       animeImgEl.attr(
//         "src",
//         animeApiData.data[index].attributes.posterImage.tiny
//       );
//       animeCaption.text(animeApiData.data[index].attributes.canonicalTitle);

//       // appending elements
//       $(".movie-anime-carousel").append(animeDivEl);
//       animeDivEl.append(animeImgEl);
//       animeDivEl.append(animeDivCaption);
//       animeDivCaption.append(animeCaption);
//     }
//   }

//   searchByPopularity();
//   searchByTopRated();
//   searchByMovie();
//   searchByRomance();
// });
=======
$(document).ready(async function () {
  //   const baseUrl = "https://kitsu.io/api/edge";
  //   const categoryFilter = "/anime?filter[categories]=adventure";
  //   const textFilter = "/anime?filter[text]=";

  // array of api urls for fetches
  const apiFetchArray = [
    "https://kitsu.io/api/edge/anime?sort=ratingRank",
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
          watch_status: "planning to watch",
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
      autoplaySpeed: 2000,
    });
  };

  for (let index = 0; index < apiFetchArray.length; index++) {
    const data = await apiFetchRequest(index);
    renderAnimeCarouselCards(data, index);
  }
});
>>>>>>> Develop
