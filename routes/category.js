const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)//RUTA PRINCIPAL

router.post('/', categoryController.insert) //INSERCION
router.post('/delete/:id', categoryController.delete) //BORRADO

module.exports = router