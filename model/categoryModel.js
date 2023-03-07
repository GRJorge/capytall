const global = require('../public/javascripts/global')

module.exports = {
	getVisible:function(con,fun){
		con.query("SELECT * FROM category WHERE visible=1 AND userFK=?",[global.userId],fun)
	},
	insert:function(con,data,fun){
		con.query("INSERT INTO category VALUES(NULL,?,?,DEFAULT,?)",[data.name,data.description,global.userId],fun)
	},
	delete:function(con,data,fun){
		con.query("UPDATE category SET visible=0 WHERE id=?",[data.id],fun)
	}
}