// initialize main imports
const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");

// initialize express app

const app = express();
const port = process.env.PORT;
app.use(cors());

// basic response for the root route
app.get("/", (req, res) => {
  res.send("Hello World! This is Autixo server ");
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

    // GET All Cars Info with pagination [per page limit 12]
    app.get("/cars", async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;

        const skip = (page - 1) * limit;

        const cars = await carsCollections
          .find()
          .skip(skip)
          .limit(limit)
          .toArray();

        const totalCars = await carsCollections.countDocuments();

        res.send({
          cars,
          totalCars,
          totalPages: Math.ceil(totalCars / limit),
          currentPage: page,
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // get random 6 cars
    app.get("/cars/random", async (req, res) => {
      try {
        // await new Promise((resolve) => setTimeout(resolve, 50000));

        const randomCar = carsCollections.aggregate([{ $sample: { size: 6 } }]);
        const result = await randomCar.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // get car details by id
    app.get("/explore-cars/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const car = await carsCollections.findOne({ _id: new ObjectId(id) });
        if (!car) {
          return res.status(404).send({ error: "Car not found" });
        }
        res.send(car);
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
