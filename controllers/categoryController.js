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
	editInsert:function(req,res){
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
			if(req.url == "/"){
				categoryModel.insert(con,req.body,function(err){
					if(!err){
						res.redirect('/category')
					}
				})
			}else{
				categoryModel.edit(con,req.body,req.params.id,function(err){
					if(!err){
						res.redirect('/category')
					}
				})
			}
		}else{
			categoryModel.getVisible(con,function(err, data){
				let titleModalAdd
				let titleBtnSubmit
				if(req.url == "/"){
					titleModalAdd = "Agregar nueva categoria:"
					titleBtnSubmit = "Guardar"
				}else{
					titleModalAdd = "Editar categoria:"
					titleBtnSubmit = "Editar"
				}
				res.render('category/index',{titleModalAdd:titleModalAdd,titleBtnSubmit:titleBtnSubmit,data: data, addVisible: "flex", errors: errors, values: values})
			})
		}
	},/* ELIMINACION DE REGISTROS (CAMBIO DE VISIBILIDAD) */
	delete:function(req,res){
		categoryModel.delete(con,req.params,function(){
			res.redirect("/category")
		})
	}
}