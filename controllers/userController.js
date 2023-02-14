var con = require('../config/connection')
var userModel = require('../model/userModel')

module.exports = {
    index:function(req,res){
        userModel.get(con,function(err,data){
            res.render('user/tableUser',{users:data})
        })
    },
    signUp:function(req,res){
        res.render('user/signUp', {classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
    },
    signIn:function(req,res){
        res.render('user/signIn')
    },
    insert:function(req,res){
        if(req.body.password.length < 6){
            res.render('user/signUp', {classEmail:"default",placeholderEmail:"default",classPassword:"textForegroundAlphaError",placeholderPassword:"Minimo 6 caracteres",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
        }else if(req.body.password != req.body.confirmPassword){
            res.render('user/signUp', {classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default",classConfirmPassword:"textForegroundAlphaError",placeholderConfirmPassword:"La contraseña no coincide"})
        }else{
            userModel.set(con,req.body,function(err){
                if(!err){
                    res.redirect('/user')
                }else{
                    res.render('user/signUp', {classEmail:"textForegroundAlphaError",placeholderEmail:"Correo ya registrado",classPassword:"default",placeholderPassword:"default",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
                }
            })
        }
    }
}