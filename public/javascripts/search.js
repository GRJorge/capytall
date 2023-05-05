const searchText = document.querySelector('#searchText')
const searchBy = document.querySelector('#searchBy')

searchText.addEventListener('input',() => {
    document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
        tr.style.display = 'none'
        tr.querySelectorAll('td').forEach(td => {
            if(td.innerHTML.toString().toLowerCase().includes(searchText.value.toLowerCase())){
                tr.style.display = 'revert'
                return true
            }
        })
    })
})