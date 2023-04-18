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
			let deleteBtn = document.querySelector('#deleteBtn')
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
				deleteBtn.style.display = 'block'
				deleteBtn.classList.remove('hiddenFirstBtn')
				deleteBtn.classList.add('showFirstBtn')
			}else{
				tr.style.backgroundColor = 'inherit'
				deleteBtn.classList.remove('showFirstBtn')
				deleteBtn.classList.add('hiddenFirstBtn')
				setTimeout(() => {
					deleteBtn.style.display = 'none'
				},200)
			}
		})
	})
})

//MOSTRAR FORMULARIO DE ELIMINACION

document.querySelector('#deleteBtn').addEventListener("click",() => {
	visibleModals('none','flex','none')
    const action = document.querySelector('#formDelete').action
	document.querySelector('#formDelete').action = action + currentId + "," + currentTable
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
	
	if(add == "flex"){
		addModal.classList.add('fadeIn')
	}else if(addModal.style.display == "flex" && add == "none"){
		addModal.classList.remove('fadeIn')
		addModal.classList.add('fadeOut')
	}
	if(deleteV == "flex"){
		deleteModal.classList.add('fadeIn')
	}else if(deleteModal.style.display == "flex" && deleteV == "none"){
		deleteModal.classList.remove('fadeIn')
		deleteModal.classList.add('fadeOut')
	}

	setTimeout(() => {
		addModal.style.display = add
		deleteModal.style.display = deleteV
		actionsButtons.style.display = actions
	},200)
}