var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',userController.index)
router.get('/signUp',userController.signUp)
router.get('/signIn',userController.signIn)

router.post('/validation',userController.validateRegister)
router.post('/signIn',userController.initUser)
router.post('/register/:name,:lastname,:email,:password,:code',userController.register)

module.exports = router 