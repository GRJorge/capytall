const con = require('../config/connection')
const incomeModel = require('../model/incomeModel')
const categoryModel = require('../model/categoryModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.userId != 0){
			categoryModel.getIdName(con,function(err,categoryData){
				if(!err){
					incomeModel.get(con,function(err,incomeData){
						if(!err){
							console.log(incomeData)
							res.render('income/index',{addVisible: 'none',categoryData: categoryData,incomeData: incomeData, errors: []})
						}else{
							console.log(err)
						}
					})
				}else{
					console.log(err)
				}
			})
		}else{
			res.redirect('/user')
		}
	},
	insert:function(req,res){
		console.log(req.body);

		let errors = []

		const body = req.body

		if(global.isBlank(body.day)){
			errors.push("Inserta el día")
		}
		if(global.isBlank(body.month)){
			errors.push("Inserta el mes")
		}
		if(global.isBlank(body.year) || global.isMin(body.year.length,4)){
			errors.push("Inserta el año")
		}
		if(global.isBlank(body.folio)){
			errors.push("Inserta el folio")
		}
		if(global.isBlank(body.concept)){
			errors.push("Inserta un concepto")
		}else if(global.isMin(body.concept.length, 3)){
			errors.push("El concepto debe contener minimo tres digitos")
		}
		if(global.isBlank(body.mount)){
			errors.push("Ingresa un monto")
		}else if(!body.mount > 0){
			errors.push("Ingresa un monto valido")
		}

		if(errors.length == 0){
			incomeModel.insert(con,body,function(err){
				if(!err){
					res.redirect('/income')
				}else{
					console.log(err)
				}
			})
		}else{
			categoryModel.getIdName(con,function(err,categoryData){
				if(!err){
					incomeModel.get(con,function(err,incomeData){
						if(!err){
							res.render('income/index',{addVisible: 'flex', categoryData: categoryData,incomeData: incomeData, errors: errors})
							console.log(errors)
						}else{
							console.log(err)
						}
					})
				}else{
					console.log(err)
				}
			})
		}
	}
}