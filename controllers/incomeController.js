const con = require('../config/connection')
const incomeModel = require('../model/incomeModel')
const categoryModel = require('../model/categoryModel')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.userId != 0){
			categoryModel.getIdName(con,function(err,categoryData){
				if(!err){
					incomeModel.get(con,function(err,data){
						if(!err){
							console.log(data)
							res.render('income/index',{categoryData: categoryData,data: data})
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
	}
}