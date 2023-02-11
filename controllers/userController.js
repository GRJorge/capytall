var con = require('../config/connection')
var userModel = require('../model/userModel')

module.exports = {
    index:function(req,res){
        userModel.get(con,function(err,data){
            res.render('user/tableUser',{users:data})
        })
    },
    register:function(req,res){
        res.render('user/signUp')
    },
    insert:function(req,res){
        userModel.set(con,req.body,function(err){
            console.log(err.code)
            res.redirect('/user')
        })
    } 
}