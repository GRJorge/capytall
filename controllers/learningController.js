var con = require('../config/connection')
var learningModel = require('../model/learningModel')

module.exports = {
    index:function(req,res){
        learningModel.get(con,function(err,data){
            res.render('learning',{users:data})
        })
    }
}