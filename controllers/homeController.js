const con = require('../config/connection')

module.exports = {
	index:function(req,res){
		res.render('home/index')
	}
}