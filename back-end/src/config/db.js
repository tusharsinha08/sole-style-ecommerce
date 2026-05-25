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

async function connectDB() {
    try {
        await client.connect();

        const database = client.db('sole_style_db');

        productsCollection = database.collection('products');

        await client.db("admin").command({ ping: 1 });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    connectDB,
    getProductsCollection: () => productsCollection
};