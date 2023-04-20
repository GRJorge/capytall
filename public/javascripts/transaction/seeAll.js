const deleteModal = document.querySelector('#deleteModal')

document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
    tr.addEventListener('click',() => {
        deleteModal.style.display = 'flex'
        deleteModal.querySelector('#formDelete').action = deleteModal.querySelector('#formDelete').action + tr.getAttribute('incomeId') + ',table'
    })
})

// YOYAL DE LA TABLA

const table = document.querySelector('#table')

var total = 0

table.querySelectorAll('#mount').forEach(mount => {
    total += parseFloat(mount.textContent.replace('$',''))
})

table.querySelector('#total').innerHTML = 'Total: $' + total

