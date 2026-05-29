const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n7fvplr.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let productsCollection;
let usersCollection;
let cartsCollection;

async function connectDB() {
    try {
        await client.connect();

        const database = client.db('sole_style_db');

        productsCollection = database.collection('products');
        usersCollection = database.collection('users');
        cartsCollection = database.collection('carts');

        await usersCollection.createIndex({ email: 1 }, { unique: true });

        await client.db("admin").command({ ping: 1 });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connectDB,
    getProductsCollection: () => productsCollection,
    getUsersCollection: () => usersCollection,
    getCartsCollection: () => cartsCollection
};