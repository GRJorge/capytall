const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)//RUTA PRINCIPAL
router.get('/trash', categoryController.trash)

router.post('/', categoryController.editInsert) //INSERCION
router.post('/edit/:id', categoryController.editInsert) //EDICION
router.post('/delete/:id', categoryController.delete) //BORRADO
router.post('/recovery/:id', categoryController.recovery) //RECUPERACION DE BORRADOS
router.post('/pdf/:id,:name', categoryController.pdf)

module.exports = router