const global = require('../public/javascripts/global')

module.exports = {
	getByCategory:function(con,type,category,fun){
		con.query('SELECT id, folio, WEEK(date) AS week, DAY(date) AS day, MONTH(date) AS month, YEAR(date) AS year, concept, mount FROM transaction WHERE type=? AND visible=1 AND categoryFK=? AND userFK=?',[type,category,global.userId],fun)
	},
	getActualMonth:function(con,type,fun){
		con.query('SELECT id, folio, WEEK(date) AS week, DAY(date) AS day, MONTH(date) AS month, YEAR(date) AS year, concept, mount, categoryFK FROM transaction WHERE type=? AND visible=1 AND userFK=? AND MONTH(date)=MONTH(NOW())',[type,global.userId],fun)
	},
	getFolioByFolio:function(con,data,fun){
		con.query('SELECT folio FROM transaction WHERE folio=? AND visible=1 AND userFK=?',[data,global.userId],fun)	
	},
	getInvisibleByType:function(con,type,fun){
		con.query('SELECT folio, transaction.id AS id, WEEK(date) AS week, CONCAT(DAY(date),"/",MONTH(date),"/",YEAR(date)) AS date, concept, mount,category.name AS category FROM transaction INNER JOIN category WHERE categoryFK=category.id AND type=? AND transaction.visible=0 AND transaction.userFK=?',[type,global.userId],fun)
	},
	insert:function(con,type,data,fun){
		con.query('INSERT INTO transaction VALUES(NULL,?,?,?,?,?,1,?,?)',[type,data.folio, data.year + "-" + data.month + "-" + data.day, data.concept, data.mount, global.userId, data.category],fun)
	},
	delete:function(con,type,id,fun){
		con.query('UPDATE transaction SET visible=0 WHERE id=? AND type=? AND userFK=?',[id,type,global.userId],fun)
	},
	recovery:function(con,id,fun){
		con.query('UPDATE transaction SET visible=1 WHERE id=? AND userFK=?',[id,global.userId],fun)
	}
}