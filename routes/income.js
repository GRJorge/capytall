const express = require('express')
const router = express.Router()

const incomeController = require('../controllers/incomeController')

router.get('/', incomeController.index)

module.exports = router