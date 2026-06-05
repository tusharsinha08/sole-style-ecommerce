const {
    fetchProducts,
    fetchSingleProduct,
    deleteProductById,
    addProductToDb
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

const addProduct = async (req, res) => {
    const product = req.body
    const result = await addProductToDb(product)

    res.send(result)
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    
    const result = await deleteProductById(id)

    res.send(result)
}

module.exports = {
    getProducts,
    getSingleProduct,
    deleteProduct,
    addProduct
};