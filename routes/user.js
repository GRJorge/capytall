var express = require('express')
var router = express.Router()
var userController = require('../controllers/userController')

router.get('/',userController.signIn)
router.get('/signUp',userController.signUp)

router.post('/validation',userController.validateRegister)
router.post('/',userController.initUser)
router.post('/register/:name,:lastname,:email,:password,:code',userController.register)

router.get('/incorrectCode',userController.incorrectCode)

module.exports = router 