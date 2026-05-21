const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config()

const port = process.env.PORT || 3000


app.use(cors())
app.use(express.json())


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n7fvplr.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const database = client.db('sole_style_db');
    const productsCollection = database.collection('products');

    // products api
    app.get('/products', async (req, res) => {
      // const cursor = productsCollection.find();
      // const result = await cursor.toArray();
      // res.send(result);
      try {
        const search = req.query.search;
        const sort = req.query.sort;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        let query = {};
        if (search) {
          query.name = {
            $regex: search,
            $options: 'i'
          }
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

        const cursor = productsCollection.find(query).sort(sortOption).skip(skip).limit(limit);
        const products = await cursor.toArray();
        const totalProducts = await productsCollection.countDocuments(query);

        res.send({
          totalProducts,
          currentPage: page,
          totalPages: Math.ceil(totalProducts / limit),
          products
        })
      } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
      }
    })

    app.get('/products/:id', async (req, res) => { 
      const id = req.params.id;
      const numericId = parseInt(id);
      // const query = { _id: new ObjectId(id)}
      const query = { _id: numericId }

      const result = await productsCollection.findOne(query);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Sole Style E-commerce Server is Running')
})

app.listen(port, () => {
  console.log(`Sole-Style app listening on port ${port}`)
})
