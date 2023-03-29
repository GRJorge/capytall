const addModal = document.querySelector('#addModal')
const deleteModal = document.querySelector('#deleteModal')
const actionsButtons = document.querySelector('#actions')

//MUESTRA DE MODAL PARA AGREGAR

document.querySelector('#addBtn').addEventListener("click",() => {
	addModal.querySelector('form').action = "/category"
	addModal.querySelector('#name').value = ""
	addModal.querySelector('#description').value = ""
	addModal.querySelector('input[type="submit"]').value = "Guardar"
	addModal.querySelector('h2').innerHTML = "Agregar nueva categoria:"
	visibleModals('flex','none','none')
})

document.querySelector("#cancelAdd").addEventListener("click",() => {
	visibleModals('none','none','flex')
})

// MODAL DE CONFIGURACION

var currentDataId = 0
var currentDataName
var currentDataDescription

const modalConfig = document.querySelector('.modalConfig')

document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
	tr.addEventListener("click",() => {
		if(tr.style.backgroundColor != 'rgb(140, 63, 166)'){
			document.querySelector('tbody').querySelectorAll('tr').forEach(tr2 => {
				tr2.style.backgroundColor = '#373740'
			})
			tr.style.backgroundColor = '#8C3FA6'
			currentDataId = tr.getAttribute('dataId')
			currentDataName = tr.getAttribute('dataName')
			currentDataDescription = tr.getAttribute('dataDescription')
			document.querySelector('#deleteBtn').style.display = 'block'
			document.querySelector('#editBtn').style.display = 'block'
		}else{
			tr.style.backgroundColor = 'inherit'
			document.querySelector('#deleteBtn').style.display = 'none'
			document.querySelector('#editBtn').style.display = 'none'
		}

		visibleModals('none','none','flex')
	})
})

//MUESTRA DE MODAL PARA EDITAR Y MODIFICACION DE ESTA
document.querySelector("#editBtn").addEventListener("click",() => {
	addModal.querySelector('form').action = "/category/edit/" + currentDataId
	addModal.querySelector('#name').value = currentDataName
	if(currentDataDescription != "Sin descripción"){
		addModal.querySelector('#description').value = currentDataDescription
	}
	addModal.querySelector('input[type="submit"]').value = "Editar"
	addModal.querySelector('h2').innerHTML = "Editar categoria:"
	visibleModals('flex','none','none')
})

//MUESTRA DE MODAL PARA ELIMINAR MAS OBTENCION DE LOS DATOS Y CAMBIO DE ACTION
document.querySelector('#deleteBtn').addEventListener("click",() => {
	const form = deleteModal.querySelector('form')

	form.action = "/category/delete/" + currentDataId
	document.getElementById("deleteNameModal").innerHTML = currentDataName
	visibleModals('none','flex','none')
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	visibleModals('none','none','flex')
})

function visibleModals(add,deleteV,actions){
	addModal.style.display = add
	deleteModal.style.display = deleteV
	actionsButtons.style.display = actions
}