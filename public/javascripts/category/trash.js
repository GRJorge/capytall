const modalRecovery = document.querySelector('.modalDelete')

document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
    tr.addEventListener("click",() => {
        modalRecovery.querySelector('#recoveryName').innerHTML = tr.getAttribute('dataName')
        modalRecovery.querySelector('form').action = "/category/recovery/" + tr.getAttribute('dataId')
        
        modalRecovery.style.display = "flex"
    })
})

document.querySelector('#cancelRecovery').addEventListener('click',() => {
    modalRecovery.style.display = "none"
})