const global = require('../public/javascripts/global')

module.exports = {
	get:function(con,fun){
		con.query('SELECT id, folio, WEEK(date) AS week, DATE_FORMAT(date,"%d-%m-%Y") AS date, concept, mount, categoryFK FROM transaction WHERE type=0 AND visible=1 AND userFK=? AND MONTH(date)=MONTH(NOW())',[global.userId],fun)
	},
	insert:function(con,data,fun){
		con.query('INSERT INTO transaction VALUES(NULL,0,?,?,?,?,1,?,?)',[data.folio, data.year + "-" + data.month + "-" + data.day, data.concept, data.mount, global.userId, data.category],fun)
	}
}