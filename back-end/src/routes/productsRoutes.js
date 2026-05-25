const express = require('express');

const {
    getProducts,
    getSingleProduct
} = require('../controllers/productsController');

const router = express.Router();

router.get('/', getProducts);

router.get('/:id', getSingleProduct);

module.exports = router;