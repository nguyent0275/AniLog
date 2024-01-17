// const editListBtn = document.querySelector('.edit-button')

const tableRows = document.querySelectorAll("tr");
console.log(tableRows);
console.log(tableRows.length);

for (let index = 0; index < tableRows.length; index++) {
  const editListBtn = document.createElement("button");
  const rowIndex = document.getElementById(index);
  editListBtn.textContent = "Edit";
  rowIndex.appendChild(editListBtn);

  editListBtn.addEventListener("click", function () {});
}

// editListBtn.addEventListener('click', function(){
//     document.querySelector('td').contentEditable = true
//     const doneBtn = document.createElement('button')
//     doneBtn.textContent = 'Done'
//     const tableRow = document.querySelector('tr')
//     tableRow.append(doneBtn)
//     doneBtn.addEventListener('click', function(){
//         document.querySelector('td').contentEditable = false
//         doneBtn.remove()
//     })
// })
