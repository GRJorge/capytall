document.querySelectorAll('#table').forEach(table => {
	var total = 0
	table.querySelectorAll('#mount').forEach(mount => {
		total += parseFloat(mount.textContent.replace('$',''))
	})
	table.querySelector('#total').innerHTML = 'Total: $' + total
})