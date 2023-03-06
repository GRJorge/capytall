const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)

router.post('/', categoryController.insert)

module.exports = router