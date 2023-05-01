const deleteModal = document.querySelector('#deleteModal')
const tbody = document.querySelector('tbody')

tbody.querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('click',() => {
        if(tr.style.backgroundColor != 'rgb(140, 63, 166)'){
            tbody.querySelectorAll('tr').forEach(tr2 => {
                tr2.style.backgroundColor = '#373740'
            })
            tr.style.backgroundColor = '#8C3FA6'
            deleteModal.classList.add('fadeIn')
            deleteModal.style.display = 'flex'
            deleteModal.querySelector('#deleteFolioModal').innerHTML = tr.getAttribute('folio')
            deleteModal.querySelector('#formDelete').action = deleteModal.querySelector('#formDelete').action + tr.getAttribute('incomeId') + ',table'
        }else{
            tr.style.backgroundColor = 'inherit'
            hideDeleteModal()
        }
    })
})

document.querySelector('#cancelDelete').addEventListener('click',() => {
    hideDeleteModal()

    tbody.querySelectorAll('tr').forEach(tr => {
        if(tr.style.backgroundColor == 'rgb(140, 63, 166)'){
            tr.style.backgroundColor = '#373740'
            return
        }  
    })
})

function hideDeleteModal(){
    deleteModal.classList.remove('fadeIn')
    deleteModal.classList.add('fadeOut')
    setTimeout(() => {
        deleteModal.style.display = 'none'
    },200)
}
// TOTAL DE LA TABLA

const table = document.querySelector('#table')

var total = 0

table.querySelectorAll('#mount').forEach(mount => {
    total += parseFloat(mount.textContent.replace('$',''))
})

table.querySelector('#total').innerHTML = 'Total: $' + total

