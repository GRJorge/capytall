const modalRecovery = document.querySelector('.modalDelete')

document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
    tr.addEventListener("click",() => {
        modalRecovery.querySelector('#recoveryName').innerHTML = tr.getAttribute('dataName')
        modalRecovery.querySelector('form').action = "/category/recovery/" + tr.getAttribute('dataId')
        
        modalRecovery.classList.remove('fadeOut')
        modalRecovery.classList.add('fadeIn')
        modalRecovery.style.display = "flex"
    })
})

document.querySelector('#cancelRecovery').addEventListener('click',() => {
    modalRecovery.classList.remove('fadeIn')
    modalRecovery.classList.add('fadeOut')
    setTimeout(() => {
        modalRecovery.style.display = "none"
    },200)
})