const date = new Date()

const dayInput = document.querySelector('#day')
const monthInput = document.querySelector('#month')

const addModal = document.querySelector('#addModal')
const deleteModal = document.querySelector('#deleteModal')

//AGREGAR FECHA ACTUAL
dayInput.value = date.getDate().toString()
monthInput.value = (date.getMonth() + 1).toString()
document.querySelector('#year').value = date.getFullYear()

//MOSTRAR FORMULARIO DE NUEVO INGRESO

document.querySelector('#addBtn').addEventListener('click',() => {
	addModal.style.display = 'flex'
	deleteModal.style.display = 'none'
})
document.querySelector('#cancelAdd').addEventListener('click',() => {
	addModal.style.display = 'none'
})

//MOSTRAR MODAL DE EDICION

var currentId = 0
var currentFolio = 0

const modalConfig = document.querySelector('#modalConfig') 

document.querySelectorAll('#income').forEach(tr => {
	tr.addEventListener("click",() => {
		currentId = tr.getAttribute('incomeId')
		currentFolio = tr.getAttribute('incomeFolio')

		modalConfig.style.display = "block"
		modalConfig.querySelector('span').innerHTML = "Folio: " + tr.getAttribute('incomeFolio')
	})
})

document.querySelector('#cancelConfig').addEventListener("click",() => {
	modalConfig.style.display = "none"
})

//MOSTRAR FORMULARIO DE ELIMINACION Y CAMBIO DE DATOS

document.querySelectorAll('#deleteBtn').forEach(btn => {
	btn.addEventListener("click",() => {
		addModal.style.display = "none"
		deleteModal.style.display = "flex"

		document.querySelector('#formDelete').action = '/income/delete/' + currentId
		document.querySelector('#deleteFolioModal').innerHTML = currentFolio
	})
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	deleteModal.style.display = "none"
})
