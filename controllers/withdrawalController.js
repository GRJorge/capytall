const con = require('../config/connection')
const withdrawalModel = require('../model/withdrawalModel')

const global = require('../public/javascripts/global')

module.exports = {
    index:function(req,res){
        if(global.userId != 0){
            res.render('withdrawal/index')
        }else{
            res.redirect('/user')
        }
    }
}