const renderAnime = async function (params) {
  const animeId = window.location.pathname.replace("/anime/", "");
  const response = await fetch(`https://kitsu.io/api/edge/anime/${animeId}`);
  const data = await response.json();
  console.log(data);
  const anime = data.data.attributes;

  let categoryArray = [];

  //   get all the categories of the anime
  const getCategories = async function (params) {
    const categoryResponse = await fetch(
      `https://kitsu.io/api/edge/anime/${animeId}/categories?page%5Blimit%5D=20&page%5Boffset%5D=0`
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
  };

  await getCategories();

  // returns only the top 6 categories
  let categoryHTML = "";
  for (let i = 0; i < 6; i++) {
    categoryHTML += `<span>${categoryArray[i][1]}</span>`;
  }

  console.log(categoryHTML);

  document.querySelector(".content").innerHTML = `   
    <div class="header">
      <div class="header-container">
        <div class="image-container">
          <img src="${anime.posterImage.small}" alt="" class="anime-poster" />
        </div>
        <div class="synopsis-container">
          <p>${anime.synopsis}</p>
        </div>
        <div class="button-container">
          <button>Add to List</button>
        </div>
      </div>
    </div>
    <div class="content-container">
      <div class="info-container">
        <ul>
          <li>Format</li>
          <span>${anime.showType}</span>
          <li>Episodes</li>
          <span>${anime.episodeCount}</span>
          <li>Episode Duration</li>
          <span>${anime.episodeLength} mins</span>
          <li>Status</li>
          <span>${anime.status}</span>
          <li>Start Date</li>
          <span>${anime.startDate}</span>
          <li>End Date</li>
          <span>${anime.endDate}</span>
          <li>Season</li>
          <span></span>
          <li>Average Score</li>
          <span>${anime.averageRating}</span>
          <li>Popularity</li>
          <span>${anime.popularityRank}</span>
          <li>Categories</li>
          ${categoryHTML}
        </ul>
      </div>
      <div class="related-container">
        {{! Add any related media sources like source manga }}
      </div>
      <div class="cast-container">
        {{! Add info about main characters and their voice actors }}
      </div>
      <div class="video-container">
        {{! inster trailer video }}
      </div>
    </div>`;
};

renderAnime();
