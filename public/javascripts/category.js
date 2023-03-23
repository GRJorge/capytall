const addModal = document.querySelector("#addModal")
const deleteModal = document.querySelector("#deleteModal")

//MUESTRA DE MODAL PARA AGREGAR

document.querySelector('#addBtn').addEventListener("click",() => {
	addModal.querySelector('form').action = "/category"
	addModal.querySelector('#name').value = ""
	addModal.querySelector('#description').value = ""
	addModal.querySelector('input[type="submit"]').value = "Guardar"
	addModal.querySelector('h2').innerHTML = "Agregar nueva categoria:"
	addModal.style.display = "flex"
})

document.querySelector("#cancelAdd").addEventListener("click",() => {
	addModal.style.display = "none"
})

// MODAL DE CONFIGURACION

var currentDataId = 0
var currentDataName
var currentDataDescription

const modalConfig = document.querySelector('.modalConfig')

document.querySelector('tbody').querySelectorAll('tr').forEach(tr => {
	tr.addEventListener("click",() => {
		currentDataId = tr.getAttribute('dataId')
		currentDataName = tr.getAttribute('dataName')
		currentDataDescription = tr.getAttribute('dataDescription')

		modalConfig.style.display = "block"
		modalConfig.querySelector('span').innerHTML = currentDataName

		addModal.style.display = "none"
	})
})

document.querySelector('#cancelConfig').addEventListener("click",() => {
	modalConfig.style.display = "none"
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
	addModal.style.display = "flex"
})

//MUESTRA DE MODAL PARA ELIMINAR MAS OBTENCION DE LOS DATOS Y CAMBIO DE ACTION
document.querySelector('#deleteBtn').addEventListener("click",() => {
	const form = deleteModal.querySelector('form')
	
	addModal.style.display = "none"
	form.action = "/category/delete/" + currentDataId
	document.getElementById("deleteNameModal").innerHTML = currentDataName
	deleteModal.style.display = "flex"
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	document.querySelector('#deleteModal').style.display = "none"
})