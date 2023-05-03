document.querySelectorAll('#table').forEach(table => {
	let total = 0
	table.querySelectorAll('#mount').forEach(mount => {
		total += parseFloat(mount.textContent.replace('$',''))
	})
	table.querySelector('#total').innerHTML = 'Total: $' + total
})

var totalGeneral = 0

document.querySelectorAll('#total').forEach(total => {
	let mount = parseFloat(total.textContent.replace('Total: $',''))

	if(totalGeneral == 0){
		totalGeneral = mount
	}else{
		totalGeneral -= mount
	}
})

document.querySelector('#balance').querySelector('span').innerHTML = "Balance: $" + totalGeneral