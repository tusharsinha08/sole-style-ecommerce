const express = require('express');

const {
    getProducts,
    getSingleProduct,
    deleteProduct,
    addProduct
} = require('../controllers/productsController');
const { verifyToken } = require('../middlewares/verifyToken');
const { verifyAdmin } = require('../middlewares/verifyAdmin');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

router.post('/', verifyToken, verifyAdmin, addProduct)

router.delete('/:id', verifyToken, verifyAdmin, deleteProduct);

module.exports = router;