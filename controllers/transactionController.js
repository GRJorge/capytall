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
					transactionModel.insert(con,getType(req),body,function(err){
						if(!err){
							res.redirect('/transaction/see/' + req.params.type + '#' + body.category)
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
		transactionModel.delete(con,getType(req),req.params.id,function(err){
			if(!err){
				res.redirect('/transaction/see/' + req.params.type + '#' + req.params.table)
			}else{
				console.log(err)
			}
		})
	},
	seeAll:function(req,res){
		if(global.userId != 0){
			transactionModel.getByCategory(con,getType(req),req.params.id,function(err,transactionData){
				if(!err){
					res.render('transaction/seeAll',{addVisible: 'none', categoryId: req.params.id,categoryName: req.params.name,transactionData:transactionData,type: req.params.type})
				}else{
					console.log(err);
				}
			})
		}else{
			res.redirect('/user')
		}
	},
	trash:function(req,res){
		if(global.userId != 0){
			transactionModel.getInvisibleByType(con,getType(req),function(err,data){
				res.render('transaction/trash',{data: data,type: req.params.type})
			})
		}else{
			res.redirect('/user')
		}
	},
	recovery:function(req,res){
		transactionModel.recovery(con,req.params.id,function(err){
			if(!err){
				res.redirect('/transaction/' + req.params.type + "/trash")
			}else{
				console.log(err)
			}
		})
	}
}

function showIndex(req,res,addVisible,errors,values){
	categoryModel.getIdName(con,function(err,categoryData){
		if(!err){
			transactionModel.getActualMonth(con,getType(req),function(err,transactionData){
				if(!err){
					res.render('transaction/index',{addVisible: addVisible, categoryData: categoryData,transactionData: transactionData, errors: errors, values: values, type: req.params.type})
				}else{
					console.log(err)
				}
			})
		}else{
			console.log(err)
		}
	})
}

function getType(req){
	let type
	if(req.params.type == 'income'){
		type = 0
	}else{
		type = 1
	}
	return type
}