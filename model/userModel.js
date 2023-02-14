module.exports = {
    get:function(con,fun){
        con.query("SELECT * FROM user",fun)
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