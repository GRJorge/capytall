module.exports = {
    get:function(con,fun){
        con.query("SELECT * FROM user",fun)
    }
}