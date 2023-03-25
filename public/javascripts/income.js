var currentId
var currentFolio

const addModal = document.querySelector('#addModal')
const editModal = document.querySelector('#editModal')
const deleteModal = document.querySelector('#deleteModal')
const modalConfig = document.querySelector('#modalConfig') 

//MOSTRAR FORMULARIO DE NUEVO INGRESO

document.querySelector('#addBtn').addEventListener('click',() => {
	visibleModals('flex','none','none','none')
})
document.querySelectorAll('#cancelAdd').forEach(btn => {
	btn.addEventListener('click',() => {
		addModal.style.display = 'none'
		editModal.style.display = 'none'
	})
})

//MOSTRAR MODAL DE CONFIGURACION

document.querySelectorAll('tbody').forEach(tbody => {
	tbody.querySelectorAll('tr').forEach(tr => {
		tr.addEventListener('click',() => {
			currentId = tr.getAttribute('incomeId')
			currentFolio = tr.getAttribute('folio')

			editModal.querySelector('#editDay').value = tr.getAttribute('day')
			editModal.querySelector('#editMonth').value = tr.getAttribute('month')
			editModal.querySelector('#editYear').value = tr.getAttribute('year')
			editModal.querySelector('#editConcept').value = tr.getAttribute('concept')
			editModal.querySelector('#editMount').value = tr.getAttribute('mount')
			editModal.querySelector('#editCategory').querySelectorAll('option').forEach(option => {
				if(option.value == tr.getAttribute('category')){
					option.selected = true
					return
				}
			})

			visibleModals('none','none','none','block')
			modalConfig.querySelector('span').innerHTML = "Folio: " + tr.getAttribute('folio')
		})
	})
})

document.querySelector('#cancelConfig').addEventListener("click",() => {
	modalConfig.style.display = "none"
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

//MODAL DE EDICION
document.querySelector('#editBtn').addEventListener('click',() => {
	visibleModals('none','flex','none','none')
	editModal.querySelector('form').action = '/income/edit/' + currentId
})

//---------------//

function visibleModals(add,edit,deleteV,config){
	addModal.style.display = add
	editModal.style.display = edit
	deleteModal.style.display = deleteV
	modalConfig.style.display = config

	document.querySelectorAll('.errorBox').forEach(errorBox => {
		errorBox.remove()
	})
}