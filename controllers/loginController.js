var con = require('../config/connection')

module.exports={
    index:function(req,res){
        con.query('SELECT * FROM user',function(err,data){
            console.log(data)
        })

        res.render('login', {title:"Test"})
    }
}