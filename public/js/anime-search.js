const animeDiv = document.querySelector('.anime-div');

const addYearFilter = function () {
  let nextYear = new Date().getFullYear() + 1;
  let startingYear = 1980;
  let yearSpan = nextYear - startingYear + 1;
  // adding years to the array all the way back to 1980
  for (let i = 0; i < yearSpan; i++) {
    let year = nextYear--;
    let yearOption = document.createElement('option');
    yearOption.setAttribute('value', year);
    yearOption.textContent = year;
    document.getElementById('year').append(yearOption);
  }
};

const addSeasonFilter = function () {
  let seasonFilter = ['Winter', 'Spring', 'Summer', 'Fall'];
  for (let i = 0; i < seasonFilter.length; i++) {
    let seasonOption = document.createElement('option');
    seasonOption.setAttribute('value', seasonFilter[i]);
    seasonOption.textContent = seasonFilter[i];
    document.getElementById('season').append(seasonOption);
  }
};

const addFormatFilter = function () {
  let formatFilter = ['ONA', 'OVA', 'TV', 'Movie', 'Music', 'Special'];
  for (let i = 0; i < formatFilter.length; i++) {
    let formatOption = document.createElement('option');
    formatOption.setAttribute('value', formatFilter[i]);
    formatOption.textContent = formatFilter[i];
    document.getElementById('format').append(formatOption);
  }
};

const categoriesFilter = async function () {
  // create an array of offset values for the api fetch link
  let nextOffset = 20;
  let lastOffset = 198;
  let offsetArray = [0];
  for (let i = 0; i < Math.ceil(lastOffset / nextOffset); i++) {
    offsetArray.push(offsetArray[i] + 20);
  }
  // console.log(offsetArray);

  // creates an array of api fetch links with all the categories
  let fetchLinkArray = [];
  for (let j = 0; j < offsetArray.length; j++) {
    let pagination = 20;
    let response = await fetch(
      `https://kitsu.io/api/edge/categories?page%5Blimit%5D=${pagination}&page%5Boffset%5D=${offsetArray[j]}`
    );
    let data = await response.json();
    fetchLinkArray.push(data);
  }
  // console.log(fetchLinkArray);

  // loops through all the links and adds all the category names to an array
  let categoryFilter = [];
  for (let k = 0; k < fetchLinkArray.length; k++) {
    for (let l = 0; l < fetchLinkArray[k].data.length; l++) {
      let categoryIDName = [];
      categoryIDName.push(
        fetchLinkArray[k].data[l].attributes.title,
        fetchLinkArray[k].data[l].id
      );
      categoryFilter.push(categoryIDName);
    }
  }
  categoryFilter.sort();
  // console.log(categoryFilter);
  addCategoryFilters(categoryFilter);
};

// adds the category filters as genre options in the dropdown menu
function addCategoryFilters(categoryFilter) {
  for (let i = 0; i < categoryFilter.length; i++) {
    let genreOption = document.createElement('option');
    genreOption.setAttribute('data-id', categoryFilter[i][1]);
    genreOption.setAttribute('value', categoryFilter[i][0]);
    genreOption.textContent = categoryFilter[i][0];
    document.getElementById('genre').append(genreOption);
  }
}

categoriesFilter();
addYearFilter();
addSeasonFilter();
addFormatFilter();

const searchAnime = async function () {
  //   clears the html after each search
  animeDiv.innerHTML = '';

  //   getting the user value from the search bar
  let title = document.querySelector('.anime-name').value.trim();
  let genre = document.getElementById('genre').value.trim().toLowerCase();
  let year = document.getElementById('year').value.trim();
  let season = document.getElementById('season').value.trim().toLowerCase();
  let format = document.getElementById('format').value.trim().toLowerCase();
  // console.log(title, genre, year, season, format);

  await formHandler(title, genre, year, season, format);
};

//  `/search/${title}?filter[categories]=${genre}&filter[seasonYear]=${year}&filter[season]=${season}&filter[subtype]=${format}`

const formHandler = async (title, genre, year, season, format) => {
  //   if there is a value, run the function

  let response;

  // if (genre) {
  //   genre = genre.replace(' ', '%20');
  // }

  if (title) {
    // calling the route in the controller, which fields the third party api call
    // data is retrieved from third party api and sent back to the front end
    response = await fetch(`/search/${title}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);

    if (genre || year || season || format) {
      // console.log(genre, year, format, title);
      // prettier-ignore
      let filterParams = `${!genre ? `` : `&filter[categories]=${genre}`}${!year ? `` : `&filter[seasonYear]=${year}`}${!season ? `` : `&filter[season]=${season}`}${!format ? `` : `&filter[subtype]=${format}`}`;
      response = await fetch(`/search/${title}${filterParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log(response);
    }
  } else {
    // prettier-ignore
    let requestUrl = `https://kitsu.io/api/edge/anime?${!genre ? `` : `&filter[categories]=${genre}`}${!year ? `` : `&filter[seasonYear]=${year}`}${!season ? `` : `&filter[season]=${season}`}${!format ? `` : `&filter[subtype]=${format}`}`;
    response = await fetch(requestUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(response);
  }
  // backend data now in the front end
  const animeData = await response.json();
  // console.log(animeData);

  // if the response returned successfully, run the function
  if (response.ok) {
    for (let index = 0; index < animeData.data.length; index++) {
      // need to create elements for what get stored into user list
      const animeApiData = animeData.data[index].attributes;
      // create
      const individualAnimeDiv = document.createElement('div');
      const titleDiv = document.createElement('div');
      const title = document.createElement('h5');
      const imageContainer = document.createElement('div');
      const imageCard = document.createElement('img');

      // attr
      individualAnimeDiv.setAttribute('class', 'anime-item');
      titleDiv.setAttribute('class', 'anime-caption');
      if (animeApiData.titles.en) {
        title.textContent = animeApiData.titles.en;
      } else {
        title.textContent = animeApiData.canonicalTitle;
      }
      imageContainer.setAttribute('class', 'anime-image-container');
      imageCard.src = animeApiData.posterImage.tiny;

      // append
      animeDiv.append(individualAnimeDiv);
      individualAnimeDiv.append(imageContainer);
      imageContainer.append(imageCard);
      imageContainer.append(titleDiv);
      titleDiv.append(title);
    }
  }
};

// Set timer in between keystrokes to prevent mass population of screen
// Will start reading the title after the user is done typing
var typingTimer; //timer identifier
var doneTypingInterval = 200; //time in ms

const searchBar = document.querySelector('input');
searchBar.addEventListener('keyup', function () {
  clearTimeout(typingTimer);
  typingTimer = setTimeout(searchAnime, doneTypingInterval);
});

searchBar.addEventListener('keydown', function () {
  clearTimeout(typingTimer);
});

document.querySelector('.filters').addEventListener('change', e => {
  if (e.target.tagName == 'SELECT') {
    searchAnime();
  }
});
