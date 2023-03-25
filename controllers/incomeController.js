const con = require('../config/connection')
const incomeModel = require('../model/incomeModel')
const categoryModel = require('../model/categoryModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.userId != 0){
			showIndex(req,res,"none","none",[],[])
		}else{
			res.redirect('/user')
		}
	},
	editInsert:function(req,res){
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
		if(req.url == "/insert"){
			if(global.isBlank(body.folio)){
				errors.push("Inserta el folio")
			}
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
		incomeModel.getFolioByFolio(con,body.folio,function(err,data){
			if(!err){
				if(data.length > 0){
					errors.push("El folio " + body.folio + " ya fue registrado")
				}

				if(errors.length == 0){
					if(req.url == "/insert"){
						incomeModel.insert(con,body,function(err){
							if(!err){
								res.redirect('/income')
							}else{
								console.log(err)
							}
						})
					}else{
						incomeModel.edit(con,body,req.params.id,function(err){
							if(!err){
								res.redirect('/income')
							}else{
								console.log(err);
							}
						})
					}
				}else{
					if(req.url == "/insert"){
						showIndex(req,res,"flex","none",errors,values)
					}else{
						showIndex(req,res,"none","flex",errors,values)
					}
					
				}
			}else{
				console.log(err)
			}
		})
	},
	delete:function(req,res){
		incomeModel.delete(con,req.params,function(err){
			if(!err){
				res.redirect('/income')
			}else{
				console.log(err);
			}
		})
	},
	edit:function(){

	}
}

function showIndex(req,res,addVisible,editVisible,errors,values){
	categoryModel.getIdName(con,function(err,categoryData){
		if(!err){
			incomeModel.get(con,function(err,incomeData){
				if(!err){
					res.render('income/index',{addVisible: addVisible, editVisible: editVisible, categoryData: categoryData,incomeData: incomeData, errors: errors, values: values})
				}else{
					console.log(err)
				}
			})
		}else{
			console.log(err)
		}
	})
}