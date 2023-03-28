const express = require('express')
const router = express.Router()

const incomeController = require('../controllers/incomeController')

router.get('/', incomeController.index)
router.post('/insert', incomeController.insert)
router.post('/delete/:id,:table', incomeController.delete)

module.exports = router