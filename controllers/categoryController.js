const con = require('../config/connection')
const categoryModel = require('../model/categoryModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){ //CARGA DE RUTA
		if(global.userId != 0){
			categoryModel.getVisible(con,function(err, data){
				res.render('category/index',{titleModalAdd:"",titleBtnSubmit:"",data: data,addVisible: "none", errors: [], values: []})
			})
		}else{
			res.redirect('/user')
		}
	}, /* INSERCION DE NUEVOS DATOS */
	insert:function(req,res){
		let errors = []
		let values = []

		values.push(req.body.name)
		values.push(req.body.description)

		if(global.isBlank(req.body.name)){
			errors.push("Ingresa un nombre")
		}else if(global.isMin(req.body.name.length, 3)){
			errors.push("El nombre debe contener minimo tres caracteres")
		}

		if(errors.length == 0){
			categoryModel.insert(con,req.body,function(err){
				if(!err){
					res.redirect('/category')
				}else{
					errors.push('Ya existe una categoria con ese nombre')
					categoryModel.getVisible(con,function(err, data){
						res.render('category/index',{titleModalAdd:"Agregar nueva categoria:",titleBtnSubmit:"Guardar",data: data, addVisible: "flex", errors: errors, values: values})
					})
				}
			})
		}else{
			categoryModel.getVisible(con,function(err, data){
				res.render('category/index',{titleModalAdd:"Agregar nueva categoria:",titleBtnSubmit:"Guardar",data: data, addVisible: "flex", errors: errors, values: values})
			})
		}
	},/* ELIMINACION DE REGISTROS (CAMBIO DE VISIBILIDAD) */
	delete:function(req,res){
		categoryModel.delete(con,req.params,function(){
			res.redirect("/category")
		})
	}
}