const router = require("express").Router();

const dayjs = require('dayjs');


// Gets the list of top 10 anime
router.get('/top', async (req, res) => {
  const apiUrl = 'https://api.myanimelist.net/v2/anime/ranking?ranking_type=all&limit=10';
  //might need to change this to environment variable
  const clientId = 'aec875617fdbb95253df5681340619fd';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-MAL-CLIENT-ID': clientId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});


// Gets the list of top 10 upcoming anime
router.get('/upcoming', async (req, res) => {
  const apiUrl = 'https://api.myanimelist.net/v2/anime/ranking?ranking_type=upcoming&limit=10';
  //might need to change this to environment variable
  const clientId = 'aec875617fdbb95253df5681340619fd';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-MAL-CLIENT-ID': clientId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});


//
let currentSeason;

if (dayjs().month() <= dayjs().month(1)) {
  currentSeason = 'winter';
}
if (dayjs().month() > dayjs().month(1) && (dayjs().month() <= dayjs().month(4))) {
  currentSeason = 'spring';
}
if (dayjs().month() > dayjs().month(4) && (dayjs().month() <= dayjs().month(7))) {
  currentSeason = 'summer';
}
if (dayjs().month() >= dayjs().month(8)) {
  currentSeason = 'fall';
}

// gets the list of seasonal anime based on current year and season
router.get('/seasonal', async (req, res) => {
  const apiUrl = `https://api.myanimelist.net/v2/anime/season/${dayjs().year()}/${currentSeason}?limit=10`;
  const clientId = 'aec875617fdbb95253df5681340619fd';

  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-MAL-CLIENT-ID': clientId,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;