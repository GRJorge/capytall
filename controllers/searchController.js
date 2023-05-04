const con = require('../config/connection')

const searchModel = require('../model/searchModel')

module.exports = {
    index:function(req,res){
        res.render('search/index')
    }
}