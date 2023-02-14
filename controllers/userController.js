var con = require('../config/connection')
var userModel = require('../model/userModel')
var classError = "textForegroundAlphaError"

module.exports = {
    index:function(req,res){
        userModel.get(con,function(err,data){
            res.render('user/tableUser',{users:data})
        })
    },
    signUp:function(req,res){
        res.render('user/signUp',{classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
    },
    signIn:function(req,res){
        res.render('user/signIn',{classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default"})
    },
    insert:function(req,res){
        if(req.body.password.length < 6){
            res.render('user/signUp', {classEmail:"default",placeholderEmail:"default",classPassword:classError,placeholderPassword:"Minimo 6 caracteres",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
        }else if(req.body.password != req.body.confirmPassword){
            res.render('user/signUp', {classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default",classConfirmPassword:classError,placeholderConfirmPassword:"La contraseña no coincide"})
        }else{
            userModel.set(con,req.body,function(err){
                if(!err){
                    res.redirect('/user')
                }else{
                    res.render('user/signUp', {classEmail:classError,placeholderEmail:"Correo ya registrado",classPassword:"default",placeholderPassword:"default",classConfirmPassword:"default",placeholderConfirmPassword:"default"})
                }
            })
        }
    },
    checkUser:function(req,res){
        userModel.searchByEmail(con,req.body.email,function(err,data){
            if(data.length == 1){
                userModel.searchByEmailAndPass(con,req.body,function(err,data){
                    if(data.length == 1){
                        //AQUI VA EL LOGIN
                        res.redirect('/user')
                    }else{
                        res.render('user/signIn',{classEmail:"default",placeholderEmail:"default",classPassword:classError,placeholderPassword:"Contraseña incorrecta"})
                    }
                })
            }else{
                res.render('user/signIn',{classEmail:classError,placeholderEmail:"Correo no registrado",classPassword:"default",placeholderPassword:"default"})
            }
        })
    }
}