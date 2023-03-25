const express = require('express')
const router = express.Router()

const incomeController = require('../controllers/incomeController')

router.get('/', incomeController.index)
router.post('/insert', incomeController.editInsert)
router.post('/delete/:id', incomeController.delete)
router.post('/edit/:id', incomeController.editInsert)

module.exports = router