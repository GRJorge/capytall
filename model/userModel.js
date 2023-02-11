module.exports = {
    get:function(con,fun){
        con.query("SELECT * FROM user",fun)
    },
    set:function(con,data,fun){
        con.query("INSERT INTO user VALUES(NULL,?,?,?)",[data.name,data.email,data.password],fun)
    }
}