const {
    fetchProducts,
    fetchSingleProduct,
    deleteProductById
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

const deleteProduct = async (req, res) => {
    const id = req.params.id
    
    const result = await deleteProductById(id)

    res.send(result)
}

module.exports = {
    getProducts,
    getSingleProduct,
    deleteProduct
};