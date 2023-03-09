const addModal = document.querySelector("#addModal")
const deleteModal = document.querySelector("#deleteModal")

//MUESTRA DE MODAL PARA AGREGAR

document.querySelector('#addBtn').addEventListener("click",function(){
	addModal.querySelector('form').action = "/category"
	addModal.querySelector('#name').value = ""
	addModal.querySelector('#description').value = ""
	addModal.querySelector('input[type="submit"]').value = "Guardar"
	addModal.querySelector('h2').innerHTML = "Agregar nueva categoria:"
	addModal.style.display = "flex"
})
//MUESTRA DE MODAL PARA EDITAR Y MODIFICACION DE ESTA
document.querySelectorAll("#editBtn").forEach(btn => {
	btn.addEventListener("click",function(){
		const id = btn.getAttribute('dataId')

		addModal.querySelector('form').action = "/category/edit/" + id
		addModal.querySelector('#name').value = btn.getAttribute('dataName')
		addModal.querySelector('#description').value = btn.getAttribute('dataDescription')
		addModal.querySelector('input[type="submit"]').value = "Editar"
		addModal.querySelector('h2').innerHTML = "Editar categoria:"
		addModal.style.display = "flex"
	})
})

document.querySelector("#cancelAdd").addEventListener("click",function(){
	addModal.style.display = "none"
})

//MUESTRA DE MODAL PARA ELIMINAR MAS OBTENCION DE LOS DATOS Y CAMBIO DE ACTION
document.querySelectorAll('#deleteBtn').forEach(btn => {
	btn.addEventListener("click",function(){
		const form = deleteModal.querySelector('form')

		const id = btn.getAttribute("dataId")
		const name = btn.getAttribute("dataName")
		
		addModal.style.display = "none"		
		form.action = "/category/delete/" + id
		document.getElementById("deleteNameModal").innerHTML = name
		deleteModal.style.display = "flex"
	})
})

document.querySelector('#cancelDelete').addEventListener("click",function(){
	document.querySelector('#deleteModal').style.display = "none"
})