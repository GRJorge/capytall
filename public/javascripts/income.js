var currentId
var currentFolio

const addModal = document.querySelector('#addModal')
const deleteModal = document.querySelector('#deleteModal')

//MOSTRAR FORMULARIO DE NUEVO INGRESO

document.querySelector('#addBtn').addEventListener('click',() => {
	visibleModals('flex','none','none','none')
})
document.querySelector('#cancelAdd').addEventListener('click',() => {
	addModal.style.display = 'none'
})

//MOSTRAR FORMULARIO DE ELIMINACION

document.querySelectorAll('#deleteBtn').forEach(btn => {
	btn.addEventListener("click",() => {
		visibleModals('none','flex','none')

		document.querySelector('#formDelete').action = '/income/delete/' + currentId
		document.querySelector('#deleteFolioModal').innerHTML = currentFolio
	})
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	deleteModal.style.display = "none"
})

//---------------//

function visibleModals(add,deleteV){
	addModal.style.display = add
	deleteModal.style.display = deleteV
}