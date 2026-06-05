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
    const limit = parseInt(queryParams.limit) || 12;

    const skip = (page - 1) * limit;

    let query = {};

    // Search by product name
    if (search) {
        query.name = {
            $regex: search,
            $options: "i"
        };
    }

    // Type filter (man/women/kids)
    if (type) {
        query.type = {
            $regex: `^${type.trim()}$`,
            $options: "i"
        };
    }

    // Category filter from categories array
    if (category) {
        query.categories = {
            $elemMatch: {
                $regex: `^${category.trim()}$`,
                $options: "i"
            }
        };
    }

    let sortOption = {};

    switch (sort) {
        case "popularity":
            sortOption.popularity = -1;
            break;

        case "latest":
            sortOption.createdAt = -1;
            break;

        case "lowToHigh":
            sortOption.price = 1;
            break;

        case "highToLow":
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

const addProductToDb = async (product) => {
    const collection = getProductsCollection()
    const result = await collection.insertOne(product)

    return result;
}

const deleteProductById = async (id) => {
    const collection = getProductsCollection()

    const query = { _id: new ObjectId(id) }

    return await collection.deleteOne(query)
}

const updateProductById = async (id, product) => {
    const collection = getProductsCollection();

    const filter = { _id: new ObjectId(id) };

    const updateDoc = {
        $set: {
            ...product,
            price: Number(product.price),
            stock: Number(product.stock),
            rating: Number(product.rating || 0),
            updatedAt: new Date()
        }
    };

    const result = await collection.updateOne(filter, updateDoc);

    return result;
};

module.exports = {
    fetchProducts,
    fetchSingleProduct,
    deleteProductById,
    addProductToDb,
    updateProductById
};