const express = require('express')
const router = express.Router()

const transactionController = require('../controllers/transactionController')

router.get('/see/:type', transactionController.index)
router.get('/:type/seeAll/:id,:name', transactionController.seeAll)
router.get('/:type/trash', transactionController.trash)
router.post('/:type/insert', transactionController.insert)
router.post('/:type/delete/:id,:table', transactionController.delete)
router.post('/:type/recovery/:id', transactionController.recovery)

module.exports = router