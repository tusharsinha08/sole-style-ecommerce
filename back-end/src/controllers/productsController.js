const {
    fetchProducts,
    fetchSingleProduct
} = require('../services/productsService');

const getProducts = async (req, res) => {
    try {
        const result = await fetchProducts(req.query);

        res.send(result);
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const result = await fetchSingleProduct(req.params.id);

        res.send(result);
    } catch (error) {
        console.error(error);

        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    getProducts,
    getSingleProduct
};