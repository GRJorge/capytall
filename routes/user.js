var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',userController.index)
router.get('/signUp',userController.signUp)
router.get('/signIn',userController.signIn)

router.post('/signUp',userController.insert)
router.post('/signIn',userController.initUser)

module.exports = router 