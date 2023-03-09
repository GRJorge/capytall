const global = require('../public/javascripts/global')

module.exports = {
	get:function(con,fun){
		con.query('SELECT * FROM transaction WHERE type=0',fun)
	}
}