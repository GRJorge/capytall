var con = require('../config/connection')
var login = require('../model/login')

module.exports={
    index:function(req,res){
        login.get(con,function(err, data){
            console.log(data)
            res.render('login', {name:data[0].name})
        })
    }
}