const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)//RUTA PRINCIPAL

router.post('/', categoryController.editInsert) //INSERCION
router.post('/edit/:id', categoryController.editInsert) //EDICION
router.post('/delete/:id', categoryController.delete) //BORRADO

module.exports = router