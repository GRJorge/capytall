const date = new Date()

const dayInput = document.querySelector('#day')
const monthInput = document.querySelector('#month')

//AGREGAR FECHA ACTUAL
dayInput.value = date.getDate().toString().padStart(2,'0')
monthInput.value = (date.getMonth() + 1).toString().padStart(2,'0')
document.querySelector('#year').value = date.getFullYear()

//AGREGAR 0 AL DIA Y MES SI LO NECESITA
monthInput.addEventListener('input',() => {
	monthInput.value = monthInput.value.toString().padStart(2,'0')
})
dayInput.addEventListener('input',() => {
	dayInput.value = dayInput.value.toString().padStart(2,'0')
})

//MOSTRAR FORMULARIO DE NUEVO INGRESO
const addModal = document.querySelector('#addModal')

document.querySelector('#addBtn').addEventListener('click',() => {
	addModal.style.display = 'flex'
})
document.querySelector('#cancelAdd').addEventListener('click',() => {
	addModal.style.display = 'none'
})