const express = require('express')
const router = express.Router();
const uploadFile = require("../middlewares/uploadImage");
const productosController = require("../controller/productosController");



/*** GET ALL PRODUCTS ***/
router.get('/',productosController.list);

/*** CREATE ONE PRODUCT ***/ 
router.get('/create',productosController.create);
router.post("/", uploadFile.single('image'), productosController.store);

/*** DETAIL ONE PRODUCT ***/ 
router.get( '/:id',productosController.detail);

/*** EDIT ONE PRODUCT ***/
router.get('/:id/edit',productosController.editProd);
router.patch('/:id',productosController.update);

router.delete('/:id',productosController.destroy)

module.exports = router;