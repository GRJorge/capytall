const con = require('../config/connection')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		res.render('category/index',{addVisible: "none", errors: [], values: []})
	},
	insert:function(req,res){
		let errors = []
		let values = []

		values.push(req.body.name)
		values.push(req.body.description)

		if(global.isBlank(req.body.name)){
			errors.push("Ingresa un nombre")
		}else if(!global.isMin(req.body.name, 2)){
			errors.push("El nombre debe contener minimo tres caracteres")
		}

		if(errors.length == 0){
			res.redirect('/category')
		}else{
			res.render('category/index',{addVisible: "flex", errors: errors, values: values})
		}
	}
}