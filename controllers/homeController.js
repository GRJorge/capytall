const con = require('../config/connection')

const homeModel = require('../model/homeModel')
const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.userId > 0){
			homeModel.statistics(con,function(err,statisticsData){
				homeModel.getActualWeek(con,function(err,transactionData){
					if(!err){
						res.render('home/index',{statisticsData: statisticsData, transactionData: transactionData})
					}else{
						console.log(err)
					}
				})
			})
		}else{
			res.redirect('/user')
		}
	}
}