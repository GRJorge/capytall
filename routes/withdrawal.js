const express = require('express')
const router = express.Router()

const withdrawalController = require('../controllers/withdrawalController')

router.get('/', withdrawalController.index)
router.post('/insert',withdrawalController.insert)
router.post('/delete/:id,:table',withdrawalController.delete)

module.exports = router