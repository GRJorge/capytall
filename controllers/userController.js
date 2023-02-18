const con = require('../config/connection')
const userModel = require('../model/userModel')
const classError = "textForegroundAlphaError"

const global = require('../public/javascripts/global')

module.exports = {
    index:function(req,res){
        userModel.get(con,function(err,data){
            res.render('user/tableUser',{users:data})
        })
    },
    signUp:function(req,res){
        res.render('user/signUp',{errors: [],values: []})
    },
    signIn:function(req,res){
        res.render('user/signIn',{classEmail:"default",placeholderEmail:"default",classPassword:"default",placeholderPassword:"default"})
    },
    insert:function(req,res){
        const body = req.body
        var errors = []
        var values = []

        values.push(body.name)
        values.push(body.lastname)
        values.push(body.email)

        if(global.isBlank(body.name)){
            errors.push('Ingresa nombre')
        }else if(global.isMin(body.name.length,3)){
            errors.push('El nombre debe contener minimo tres caracteres')
        }
        if(global.isBlank(body.lastname)){
            errors.push('Ingresa apellido(s)')
        }else if(global.isMin(body.lastname.length,3)){
            errors.push('El apellido debe contener minimo tres caracteres')
        }
        if(!global.isEmail(body.email)){
            errors.push("Ingresa un correo valido")
        }else{
            userModel.searchByEmail(con,body.email,function(err,data){
                if(data.length == 1){
                    errors.push("Correo en uso")
                }
            })
        }
        if(global.isMin(body.password.length,1)){
            errors.push("Ingresa una contraseña")
        }else if(global.isMin(body.password.length,6)){
            errors.push("La contraseña debe contener minimo seis caracteres")
        }else if(global.notSpace(body.password)){
            errors.push("La contraseña no debe contener espacios")
        }
        if(global.isMin(body.confirmPassword,1)){
            errors.push("Confima la contraseña")
        }else if(!global.equals(body.confirmPassword,body.password)){
            errors.push("Las contraseñas no coinciden")
        }

        if(errors.length == 0){
            res.redirect('/user')
        }else{
            res.render('user/signUp',{errors: errors,values: values})
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