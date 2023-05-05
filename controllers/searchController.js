const con = require('../config/connection')

const searchModel = require('../model/searchModel')
const global = require('../public/javascripts/global')

module.exports = {
    index:function(req,res){
        if(global.userId > 0){
            searchModel.get(con,function(err,data){
                if(!err){
                    res.render('search/index',{data: data})
                }else{
                    console.log(err)
                }
            })
        }else{
            res.redirect('/user')
        }
    }
}