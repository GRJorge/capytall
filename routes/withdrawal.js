const express = require('express')
const router = express.Router()

const withdrawalController = require('../controllers/withdrawalController')

router.get('/', withdrawalController.index)

module.exports = router