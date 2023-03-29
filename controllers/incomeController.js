const con = require('../config/connection')
const transactionModel = require('../model/transactionModel')
const categoryModel = require('../model/categoryModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.userId != 0){
			showIndex(req,res,"none",[],[])
		}else{
			res.redirect('/user')
		}
	},
	insert:function(req,res){
		let errors = []
		let values = []

		const body = req.body

		values.push(body.day)
		values.push(body.month)
		values.push(body.year)
		values.push(body.folio)
		values.push(body.concept)
		values.push(body.mount)
		values.push(body.category)

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
		transactionModel.getFolioByFolio(con,body.folio,function(err,data){
			if(!err){
				if(data.length > 0){
					errors.push("El folio " + body.folio + " ya fue registrado")
				}

				if(errors.length == 0){
					transactionModel.insert(con,0,body,function(err){
						if(!err){
							res.redirect('/income#' + body.category)
						}else{
							console.log(err)
						}
					})
				}else{
					showIndex(req,res,"flex",errors,values)					
				}
			}else{
				console.log(err)
			}
		})
	},
	delete:function(req,res){
		transactionModel.delete(con,0,req.params.id,function(err){
			if(!err){
				res.redirect('/income#' + req.params.table)
			}else{
				console.log(err);
			}
		})
	},
}

function showIndex(req,res,addVisible,errors,values){
	categoryModel.getIdName(con,function(err,categoryData){
		if(!err){
			transactionModel.get(con,0,function(err,incomeData){
				if(!err){
					res.render('income/index',{addVisible: addVisible, categoryData: categoryData,incomeData: incomeData, errors: errors, values: values})
				}else{
					console.log(err)
				}
			})
		}else{
			console.log(err)
		}
	})
}