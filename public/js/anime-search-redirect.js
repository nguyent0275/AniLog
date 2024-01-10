const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('.anime-name').value.trim();
    console.log(title)

    if (title) {
        const response = await fetch (`/api/anime/search/${title}`, {
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }
        })
        const animeData = await response.json()
        console.log(animeData)
    }
}

document
    .querySelector('.anime-search')
    .addEventListener('click', newFormHandler)