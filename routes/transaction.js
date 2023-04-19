const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.get('/:type', transactionController.index)
router.get('/:type/seeAll/:id,:name', transactionController.seeAll)
router.post('/:type/insert', transactionController.insert)
router.post('/:type/delete/:id,:table', transactionController.delete)

module.exports = router