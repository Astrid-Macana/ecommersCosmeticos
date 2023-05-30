const router = require("express").Router();
const productosController = require("../controller/productosController");




router.get('/',productosController.list);

router.get('/create',productosController.create);

router.post('/create',productosController.store);

router.get( '/:id',productosController.detail);

router.get('/:id/edit',productosController.editProd);

router.patch('/:id',productosController.uptdate);

router.delete('/:id',productosController.destroy)

module.exports = router;