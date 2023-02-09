var express = require('express')
var router = express.Router()

var learningController = require('../controllers/learningController')

router.get('/',learningController.index)

module.exports = router