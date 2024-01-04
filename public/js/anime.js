$(document).ready(function(){
  
const baseUrl = 'https://kitsu.io/api/edge'
const categoryFilter = '/anime?filter[categories]=adventure'
const textFilter = '/anime?filter[text]=cowboy%20bebop'

async function searchByTopRated() {
    let requestUrl = 'https://kitsu.io/api/edge/anime?sort=ratingRank';
    let response = await fetch(requestUrl);
    let jsonData = await response.json();
    console.log(requestUrl)
    renderTopAnime(jsonData)
}

async function renderTopAnime(animeApiData) {

    for (let index = 0; index < animeApiData.data.length; index++) {
        console.log("test");
        // creating html elements
        let animeDivEl = $("<div>")
        let animeImgEl = $("<img>")
        let animeDivCaption = $("<div>")
        // let animeCaption = $("<h5>")

        // setting attributes
        animeDivEl.addClass("anime-item")
        animeImgEl.addClass("top-anime-img")
        animeDivCaption.addClass("top-anime-caption")
        animeImgEl.attr("src", animeApiData.data[index].attributes.posterImage.tiny)
        // animeCaption.text(animeApiData.data[index].attributes.canonicalTitle)

        // appending elements
        $(".top-anime-carousel").append(animeDivEl)
        animeDivEl.append(animeImgEl)
        animeDivEl.append(animeDivCaption)
        // animeDivCaption.append(animeCaption)   
    }
}

async function searchByPopularity(param) {
    let requestUrl = 'https://kitsu.io/api/edge/anime?sort=popularityRank';
    let response = await fetch(requestUrl)
    let jsonData = await response.json();
    console.log(requestUrl)
    renderPopularAnime(jsonData)
    $('.anime-carousel').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2000,
    });
  }
  

async function renderPopularAnime(animeApiData) {

    for (let index = 0; index < animeApiData.data.length; index++) {
        console.log("test");
        // creating html elements
        let animeDivEl = $("<div>")
        let animeImgEl = $("<img>")
        let animeDivCaption = $("<div>")
        // let animeCaption = $("<h5>")

        // setting attributes
        animeDivEl.addClass("anime-item")
        animeImgEl.addClass("popular-anime-img")
        animeDivCaption.addClass("popular-anime-caption")
        animeImgEl.attr("src", animeApiData.data[index].attributes.posterImage.tiny)
        // animeCaption.text(animeApiData.data[index].attributes.canonicalTitle)

        // appending elements
        $(".popular-anime-carousel").append(animeDivEl)
        animeDivEl.append(animeImgEl)
        animeDivEl.append(animeDivCaption)
        // animeDivCaption.append(animeCaption)   
    }
}
  searchByPopularity()
  searchByTopRated()
});