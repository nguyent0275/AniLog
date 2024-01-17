// const editListBtn = document.querySelector('.edit-button')
const editAnimeBox = document.getElementById('edit-anime-box')
editAnimeBox.style.display = 'none'

// create edit anime box
const editAnimeDiv = document.createElement('div')
const titleHeader = document.createElement('h4')
const animeTitle = document.createElement('p')
const watchStatusDropDownLabel = document.createElement("label")
const watchStatusDropDownSelect = document.createElement("select")
const ratingsDropDownLabel = document.createElement("label")
const ratingsDropDownSelect = document.createElement("select")
const doneBtn = document.createElement('button')

// attr
titleHeader.textContent = 'Anime Title: '
watchStatusDropDownLabel.textContent = "Watch Status"
watchStatusDropDownSelect.setAttribute('id', 'watch-status')
watchStatusDropDownSelect.setAttribute('name', 'watch-status')
ratingsDropDownLabel.textContent = "Rating"
ratingsDropDownSelect.setAttribute('id', 'rating')
ratingsDropDownSelect.setAttribute('name', 'ratings')
doneBtn.textContent = 'Done'

// append
editAnimeBox.append(editAnimeDiv)
editAnimeDiv.append(titleHeader)
editAnimeDiv.append(watchStatusDropDownLabel)
editAnimeDiv.append(ratingsDropDownLabel)
watchStatusDropDownLabel.append(watchStatusDropDownSelect)
ratingsDropDownLabel.append(ratingsDropDownSelect)
editAnimeDiv.append(doneBtn)

// done button that sends the updated information to backend to save
doneBtn.addEventListener('click', async function (event) { 
  editAnimeBox.style.display = 'none'
  // send data to backend as well 
  const animeToUpdate = {
    anime_title: animeTitle.innerHTML,
    rating: ratingsDropDownSelect.value,
    watch_status: watchStatusDropDownSelect.value
  }
  console.log(animeToUpdate)
  event.preventDefault()
  const response = await fetch (`api/status/update`, {
    method: 'PUT',
    body: JSON.stringify(animeToUpdate),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (response.ok){
    console.log('updated list')
  } else{
    console.log('error')
  }
  // clears anime title on done 
  animeTitle.innerHTML = ''
 })

// creates the dropdown menus for watch status
const watchStatusArray = ['planning to watch', 'watching', 'completed', 'dropped']
for (let index = 0; index < watchStatusArray.length; index++) {
  const watchStatusOptions = document.createElement("option")
  watchStatusOptions.setAttribute('value', watchStatusArray[index])
  watchStatusOptions.textContent = watchStatusArray[index]
  watchStatusDropDownSelect.append(watchStatusOptions)
}

// creates the dropdown menu for ratings 
const ratingsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
for (let index = 0; index < ratingsArray.length; index++) {
  const ratingsOptions = document.createElement("option")
  ratingsOptions.setAttribute('value', ratingsArray[index])
  ratingsOptions.textContent = ratingsArray[index]
  ratingsDropDownSelect.append(ratingsOptions)
}

// returning an array with all the table rows
// using this as a length for a for loop to create edit buttons
const tableRows = document.querySelectorAll("tr");

for (let index = 0; index < tableRows.length; index++) {
  const editListBtn = document.createElement("button");
  const rowIndex = document.getElementById(index);
  console.log(rowIndex)
  editListBtn.textContent = "Edit";
  rowIndex.append(editListBtn);

  editListBtn.addEventListener("click", function () {
    editAnimeBox.style.display = 'block'
    animeTitle.textContent = document.getElementById('title-' + index).innerHTML
    titleHeader.append(animeTitle)
  });

}

