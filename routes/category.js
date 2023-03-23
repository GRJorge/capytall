const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)//RUTA PRINCIPAL
router.get('/trash', categoryController.trash)
router.get('/recovery/:id', categoryController.recovery)

router.post('/', categoryController.editInsert) //INSERCION
router.post('/edit/:id', categoryController.editInsert) //EDICION
router.post('/delete/:id', categoryController.delete) //BORRADO

module.exports = router