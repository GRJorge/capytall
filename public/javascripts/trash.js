const modalRecovery = document.querySelector('.modalDelete')

const tbody = document.querySelector('tbody')

tbody.querySelectorAll('#row').forEach(tr => {
    tr.addEventListener("click",() => {
        if(tr.style.backgroundColor != 'rgb(140, 63, 166)'){
            document.querySelector('tbody').querySelectorAll('#row').forEach(tr2 => {
                tr2.style.backgroundColor = '#373740'
            })
            tr.style.backgroundColor = '#8C3FA6'

            let recoveryName = modalRecovery.querySelector('#recoveryName')
            let recoveryFormAction = modalRecovery.querySelector('form')

            if(window.location.href.includes('transaction')){
                recoveryName.innerHTML = tr.getAttribute('dataFolio')
                recoveryFormAction.action = "/transaction/" + modalRecovery.getAttribute('type') +"/recovery/" + tr.getAttribute('dataId')
            }else{
                recoveryName.innerHTML = tr.getAttribute('dataName')
                recoveryFormAction.action = "/category/recovery/" + tr.getAttribute('dataId')
            }
            
            
            modalRecovery.classList.remove('fadeOut')
            modalRecovery.classList.add('fadeIn')
            modalRecovery.style.display = "flex"
        }else{
            tr.style.backgroundColor = 'inherit'
            modalRecovery.classList.remove('fadeIn')
            modalRecovery.classList.add('fadeOut')
            setTimeout(() => {
                modalRecovery.style.display = "none"
            },200)
        }
    })
})

document.querySelector('#cancelRecovery').addEventListener('click',() => {
    modalRecovery.classList.remove('fadeIn')
    modalRecovery.classList.add('fadeOut')
    setTimeout(() => {
        modalRecovery.style.display = "none"
    },200)
    tbody.querySelectorAll('#row').forEach(tr => {
        if(tr.style.backgroundColor == 'rgb(140, 63, 166)'){
            tr.style.backgroundColor = '#373740'
            return
        }  
    })
})