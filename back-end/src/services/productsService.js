const { ObjectId } = require('mongodb');

const {
    getProductsCollection
} = require('../config/db');

const fetchProducts = async (queryParams) => {
    const productsCollection = getProductsCollection();

    const search = queryParams.search;
    const sort = queryParams.sort;
    const type = queryParams.type;
    const category = queryParams.category;

    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;

    const skip = (page - 1) * limit;

    let query = {};

    if (search) {
        query.name = {
            $regex: search,
            $options: 'i'
        };
    }

    if (type) {
        query.type = type;
    }

    if (category) {
        query.category = category;
    }

    let sortOption = {};

    switch (sort) {
        case 'popularity':
            sortOption.popularity = -1;
            break;

        case 'latest':
            sortOption.createdAt = -1;
            break;

        case 'lowToHigh':
            sortOption.price = 1;
            break;

        case 'highToLow':
            sortOption.price = -1;
            break;

        default:
            break;
    }

    const products = await productsCollection
        .find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .toArray();

    const totalProducts =
        await productsCollection.countDocuments(query);

    return {
        totalProducts,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        products
    };
};

const fetchSingleProduct = async (id) => {
    const productsCollection = getProductsCollection();

    const query = {
        _id: new ObjectId(id)
    };

    return await productsCollection.findOne(query);
};

module.exports = {
    fetchProducts,
    fetchSingleProduct
};