const express = require('express');

const {
    getProducts,
    getSingleProduct,
    deleteProduct,
    addProduct,
    updateProduct
} = require('../controllers/productsController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.post('/', verifyToken, verifyAdmin, addProduct)

router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

router.patch('/:id',verifyToken, verifyAdmin, updateProduct)

module.exports = router;