const con = require('../config/connection')
const PDFDocument = require('pdfkit-table')
const categoryModel = require('../model/categoryModel')
const transactionModel = require('../model/transactionModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){ //CARGA DE RUTA
		if(global.userId != 0){
			showIndex(res,"","","none",[],[],"","none",[])
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
		if(global.isBlank(req.body.description)){
			req.body.description = "Sin descripción"
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
			let titleModalAdd
			let titleBtnSubmit
			if(req.url == "/"){
				titleModalAdd = "Agregar nueva categoria:"
				titleBtnSubmit = "Guardar"
			}else{
				titleModalAdd = "Editar categoria:"
				titleBtnSubmit = "Editar"
			}
			showIndex(res,titleModalAdd,titleBtnSubmit,"flex",errors,values,"","none",[])
		}
	},/* ELIMINACION DE REGISTROS (CAMBIO DE VISIBILIDAD) */
	delete:function(req,res){
		categoryModel.delete(con,req.params,function(){
			res.redirect("/category")
		})
	}, //PAPELERA
	trash:function(req,res){
		if(global.userId != 0){
			categoryModel.getDelete(con,function(err,data){
				res.render('category/trash',{data: data})	
			})
		}else{
			res.redirect('/user')
		}
	}, //RECUPERACION DE CATEGORIA
	recovery:function(req,res){
		categoryModel.recovery(con,req.params.id,function(err){
			if(!err){
				res.redirect('/category/trash')
			}
		})
	},
	pdf:function(req,res){
		let errors = []

		const body = req.body

		if(global.isBlank(body.to)){
			errors.push('Ingresa la fecha inicial')
		}
		if(global.isBlank(body.from)){
			errors.push('Ingresa la fecha final')
		}

		if(errors.length == 0){
			transactionModel.getFromPdf(con,req.body.to,req.body.from,req.params.id,function(err,data){
				if(!err){
					console.log(data);
					if(data.length > 0){
						transactionModel.getTotalFromPdf(con,req.body.to,req.body.from,req.params.id,function(err,totals){
							if(!err){
								const doc = new PDFDocument();
								const date = new Date()
			
								res.attachment('output.pdf');
								doc.pipe(res);
								
								doc.image('public/images/isoDark.png', {
									fit: [60, 60],  // Tamaño de la imagen
									align: 'left',  // Alineación de la imagen
								},26);
								doc.fontSize(18).text('Balance para: ' + req.params.name, {
									align: "right"
								},40);
								doc.fontSize(10).text('Impreso el: ' + date.getDate().toString().padStart(2,'0') + "/" + (date.getMonth()+1).toString().padStart(2,'0') + "/" + date.getFullYear(),{
									align: "right"
								});
								doc.fontSize(10).text('Usuario: Jorge Garcia Rodriguez',{
									align: "right",
								});
			
								const table = {
									title: "Del " + req.body.to.replace(/-/g,'/') + " al " + req.body.from.replace(/-/g,'/'),
									headers: ['Fecha', 'Folio', 'Concepto','Monto'],
									rows: []
								};
								
								data.forEach(row => {
									table.rows.push([row.date,row.folio,row.concept,row.mount])
								})

								doc.table(table,{
									prepareHeader: () => doc.font('Helvetica'),
									prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
									align: 'center',
									startPage: 1,
									margin: { top: 50 },
									y: 110
								})

								const tableTotals = {
									headers: ['', 'Total'],
									rows: [['Ingresos:',totals[0].incomeTotal],
									['Retiros:',totals[0].withdrawalTotal],
									['Total:',(totals[0].incomeTotal - totals[0].withdrawalTotal)]]
								};
								
								doc.table(tableTotals,{
									prepareHeader: () => doc.font('Helvetica'),
									prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
									align: 'center',
									startPage: 1,
									margin: { top: 50 },
									x:300
								})

								doc.end();
							}else{
								console.log(err);
							}
						})
					}else{
						showIndex(res,"","","none",[],[],req.params.name,"flex",["No hay datos entre esas fechas"])		
					}
				}else{
					console.log(err);
				}
			})
		}else{
			showIndex(res,"","","none",[],[],req.params.name,"flex",errors)
		}
	}
}

function showIndex(res,titleModalAdd,titleBtnSubmit,addVisible,errors,values,titleModalPdf,pdfVisible,errorsPdf){
	categoryModel.getVisible(con,function(err, data){
		if(!err){
			res.render('category/index',{titleModalAdd:titleModalAdd,titleBtnSubmit:titleBtnSubmit,data: data,addVisible: addVisible, errors: errors, values: values, titleModalPdf: titleModalPdf, pdfVisible: pdfVisible,errorsPdf: errorsPdf})
		}else{
			console.log(err);
		}
	})
}