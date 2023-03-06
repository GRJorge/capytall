module.exports = {
	getVisible:function(con,fun){
		con.query("SELECT * FROM category WHERE visible=1",fun)
	},
	insert:function(con,data,fun){
		con.query("INSERT INTO category VALUES(NULL,?,?,DEFAULT)",[data.name,data.description],fun)
	}
}