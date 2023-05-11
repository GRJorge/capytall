const addModal = document.querySelector('#addModal')
const deleteModal = document.querySelector('#deleteModal')
const pdfModal = document.querySelector('#modalPdf')
const actionsButtons = document.querySelector('#actions')

//MUESTRA DE MODAL PARA AGREGAR

document.querySelector('#addBtn').addEventListener("click",() => {
	addModal.querySelector('form').action = "/category"
	addModal.querySelector('#name').value = ""
	addModal.querySelector('#description').value = ""
	addModal.querySelector('input[type="submit"]').value = "Guardar"
	addModal.querySelector('h2').innerHTML = "Agregar nueva categoria:"
	visibleModals('flex','none','none','none')
})

document.querySelector("#cancelAdd").addEventListener("click",() => {
	visibleModals('none','none','none','flex')
})

// MODAL DE CONFIGURACION

var currentDataId = 0
var currentDataName
var currentDataDescription

const modalConfig = document.querySelector('.modalConfig')

document.querySelector('tbody').querySelectorAll('#row').forEach(tr => {
	tr.addEventListener("click",() => {
		let createPdf = document.querySelector('#createPdf')
		let deleteBtn = document.querySelector('#deleteBtn')
		let editBtn = document.querySelector('#editBtn')
		if(tr.style.backgroundColor != 'rgb(140, 63, 166)'){
			document.querySelector('tbody').querySelectorAll('#row').forEach(tr2 => {
				tr2.style.backgroundColor = '#373740'
			})
			tr.style.backgroundColor = '#8C3FA6'
			currentDataId = tr.getAttribute('dataId')
			currentDataName = tr.getAttribute('dataName')
			currentDataDescription = tr.getAttribute('dataDescription')
			
			deleteBtn.classList.remove('hiddenThirdBtn')
			deleteBtn.classList.add('showThirdBtn')
			editBtn.classList.remove('hiddenSecondBtn')
			editBtn.classList.add('showSecondBtn')
			createPdf.classList.remove('hiddenFirstBtn')
			createPdf.classList.add('showFirstBtn')
			deleteBtn.style.display = 'block'
			editBtn.style.display = 'block'
			createPdf.style.display = 'block'
		}else{
			tr.style.backgroundColor = 'inherit'
			
			deleteBtn.classList.remove('showThirdBtn')
			deleteBtn.classList.add('hiddenThirdBtn')
			editBtn.classList.remove('showSecondBtn')
			editBtn.classList.add('hiddenSecondBtn')
			createPdf.classList.remove('showFirstBtn')
			createPdf.classList.add('hiddenFirstBtn')
			setTimeout(() => {
				deleteBtn.style.display = 'none'
				editBtn.style.display = 'none'
				createPdf.style.display = 'none'
			},200)
		}

		visibleModals('none','none','none','flex')
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
	visibleModals('flex','none','none','none')
})

//MUESTRA DE MODAL PARA ELIMINAR MAS OBTENCION DE LOS DATOS Y CAMBIO DE ACTION
document.querySelector('#deleteBtn').addEventListener("click",() => {
	const form = deleteModal.querySelector('form')
''
	form.action = "/category/delete/" + currentDataId
	document.getElementById("deleteNameModal").innerHTML = currentDataName
	visibleModals('none','flex','none','none')
})

document.querySelector('#cancelDelete').addEventListener("click",() => {
	visibleModals('none','none','none','flex')
})

//MUESTRA DE MODAL DE PDF
document.querySelector('#createPdf').addEventListener('click',() => {
	document.querySelector('#pdfNameModal').innerHTML = currentDataName
	visibleModals('none','none','flex','none')	
})

document.querySelector('#cancelPdf').addEventListener('click',() => {
	visibleModals('none','none','none','flex')
})

function visibleModals(add,deleteV,pdf,actions){
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
	if(pdf == 'flex'){
		pdfModal.classList.add('fadeIn')
	}else if(pdfModal.style.display == "flex" && pdf == "none"){
		pdfModal.classList.remove('fadeIn')
		pdfModal.classList.add('fadeOut')
	}

	setTimeout(() => {
		addModal.style.display = add
		deleteModal.style.display = deleteV
		pdfModal.style.display = pdf
		actionsButtons.style.display = actions
	},200)
}
