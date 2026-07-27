// initialize main imports
const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");

// initialize express app

const app = express();
const port = process.env.PORT;
app.use(cors());

// basic response for the root route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// MONGODB SETUP

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const database = client.db("autixo");
    const carsCollections = database.collection("cars");

    // GET All Cars Info
    app.get("/cars", async (req, res) => {
      try {
        const allCars = carsCollections.find({});
        const allCarData = await allCars.toArray();
        res.send(allCarData);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // get random 6 cars
    app.get("/cars/random", async (req, res) => {
      try {
        const randomCar = carsCollections.aggregate([{ $sample: { size: 6 } }]);
        const result = await randomCar.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    //
    //
    //
    //
    //
    //
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log(
    //   "Pinged your deployment. You successfully connected to MongoDB!",
    // );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
