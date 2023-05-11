const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.index)//RUTA PRINCIPAL
router.get('/trash', categoryController.trash)

router.post('/', categoryController.editInsert) //INSERCION
router.post('/edit/:id', categoryController.editInsert) //EDICION
router.post('/delete/:id', categoryController.delete) //BORRADO
router.post('/recovery/:id', categoryController.recovery) //RECUPERACION DE BORRADOS

/*router.get('/pdf', (req, res) => {
    const doc = new PDFDocument();
    res.attachment('output.pdf');
    doc.pipe(res);

    const date = 'Siu'
    doc.fontSize(20).text('Fecha: ' + new Date().getMonth(), {
        align: 'right'
    });
    doc.circle(60, 70, 30).fill('#6600FF');


    doc.end();
});*/

module.exports = router