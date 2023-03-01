const con = require('../config/connection')

const global = require('../public/javascripts/global')

module.exports = {
	index:function(req,res){
		if(global.test > 0){
			res.render('home/index')
		}else{
			res.redirect('/user')
		}
	}
}