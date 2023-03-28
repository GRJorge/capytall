//MOSTRAR FORMULARIO DE NUEVO INGRESO

document.querySelector('#addBtn').addEventListener('click',() => {
	visibleModals('flex','none','none','none')
})
document.querySelector('#cancelAdd').addEventListener('click',() => {
	visibleModals('none','none','flex')
})

//MOSTRAR BOTON DE ELIMINAR
const tables = document.querySelectorAll('tbody')

var currentId
var currentFolio
var currentTable

tables.forEach(tbody => {
	tbody.querySelectorAll('tr').forEach(tr => {
		tr.addEventListener('click',() => {
			if(tr.style.backgroundColor != 'rgb(140, 63, 166)'){
				tables.forEach(tbody2 => {
					tbody2.querySelectorAll('tr').forEach(tr2 => {
						tr2.style.backgroundColor = '#373740'
					})
				})
				tr.style.backgroundColor = '#8C3FA6'
				currentId = tr.getAttribute('incomeId')
				currentFolio = tr.getAttribute('folio')
				currentTable = tr.getAttribute('table')
				document.querySelector('#deleteBtn').style.display = 'block'
			}else{
				tr.style.backgroundColor = 'inherit'
				document.querySelector('#deleteBtn').style.display = 'none'
			}
		})
	})
})

//MOSTRAR FORMULARIO DE ELIMINACION

document.querySelector('#deleteBtn').addEventListener("click",() => {
	visibleModals('none','flex','none')

	document.querySelector('#formDelete').action = '/income/delete/' + currentId + "," + currentTable
	document.querySelector('#deleteFolioModal').innerHTML = currentFolio
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	visibleModals('none','none','flex')
})

//---------------//

function visibleModals(add,deleteV,actions){
	const addModal = document.querySelector('#addModal')
	const deleteModal = document.querySelector('#deleteModal')
	const actionsButtons = document.querySelector('#actions')

	addModal.style.display = add
	deleteModal.style.display = deleteV
	actionsButtons.style.display = actions
}