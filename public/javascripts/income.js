const date = new Date()

document.querySelector('#day').value = date.getDate().toString().padStart(2,'0')
document.querySelector('#month').value = (date.getMonth() + 1).toString().padStart(2,'0')
document.querySelector('#year').value = date.getFullYear()