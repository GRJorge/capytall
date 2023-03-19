const date = new Date()

const dayInput = document.querySelector('#day')
const monthInput = document.querySelector('#month')

const addModal = document.querySelector('#addModal')
const deleteModal = document.querySelector('#deleteModal')

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

document.querySelector('#addBtn').addEventListener('click',() => {
	addModal.style.display = 'flex'
	deleteModal.style.display = 'none'
})
document.querySelector('#cancelAdd').addEventListener('click',() => {
	addModal.style.display = 'none'
})

//MOSTRAR FORMULARIO DE ELIMINACION Y CAMBIO DE DATOS

document.querySelectorAll('#deleteBtn').forEach(btn => {
	btn.addEventListener("click",() => {
		addModal.style.display = "none"
		deleteModal.style.display = "flex"
		
		const id = btn.getAttribute("dataId")
		const folio = btn.getAttribute("dataFolio")

		document.querySelector('#formDelete').action = '/income/delete/' + id
		document.querySelector('#deleteFolioModal').innerHTML = folio
	})
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	deleteModal.style.display = "none"
})