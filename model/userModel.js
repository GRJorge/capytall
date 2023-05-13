module.exports = {
    get:function(con,fun){
        con.query("SELECT * FROM user",fun)
    },
    getName:function(con,id,fun){
        con.query("SELECT name, lastname FROM user WHERE id=?",[id],fun)
    },
    set:function(con,data,fun){
        con.query("INSERT INTO user VALUES(NULL,?,?,?,?)",[data.name,data.lastname,data.email,data.password],fun)
    },
    searchByEmail:function(con,data,fun){
        con.query("SELECT * FROM user WHERE email=?",[data],fun)
    },
    searchByEmailAndPass:function(con,data,fun){
        con.query("SELECT * FROM user WHERE email=? AND password=?",[data.email,data.password],fun)
    }
}