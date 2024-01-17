const editListBtn = document.querySelector('.edit-button')

editListBtn.addEventListener('click', function(){
    document.querySelector('td').contentEditable = true
    const doneBtn = document.createElement('button')
    doneBtn.textContent = 'Done'
    editListBtn.append(doneBtn)
    doneBtn.addEventListener('click', function(){
        document.querySelector('td').contentEditable = false
    })
})