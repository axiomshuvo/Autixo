// initialize main imports
const express = require("express");
const env = require("dotenv").config();
const cors = require("cors");
const { ObjectId } = require("mongodb");

// initialize express app

const app = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());

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
    const usersCollections = database.collection("user");

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

    // Add Car to the database
    app.post("/add-car", async (req, res) => {
      try {
        const newCar = req.body;
        const result = await carsCollections.insertOne(newCar);
        console.log(
          `New car added with id: ${result.insertedId} , ${newCar.ownerId}`,
        );
        res
          .status(201)
          .send({ message: "Car added successfully", id: result.insertedId });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message,
        });
      }
    });

    // Get My Added Cars by Owner ID
    app.get("/my-added-cars/:ownerId", async (req, res) => {
      try {
        const { ownerId } = req.params;

        if (!ownerId) {
          return res.status(400).send({
            success: false,
            message: "Owner ID is required",
          });
        }

        const cars = await carsCollections.find({ ownerId }).toArray();

        res.status(200).send(cars);
      } catch (error) {
        console.error("Error fetching cars:", error);

        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // // Delete Car by ID
    app.delete("/delete-car/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).send({
            success: false,
            message: "Car ID is required",
          });
        }

        const result = await carsCollections.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({
            success: false,
            message: "Car not found",
          });
        }

        res.status(200).send({
          success: true,
          message: "Car deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting car:", error);

        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // update car by id
    app.put("/cars/:id", async (req, res) => {
      const { id } = req.params;

      const result = await carsCollections.updateOne(
        { _id: new ObjectId(id) },
        {
          $set: req.body,
        },
      );

      res.send(result);
    });

    // get user details by id
    app.get("/user/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const user = await usersCollections.findOne({ _id: new ObjectId(id) });
        if (!user) {
          return res.status(404).send({ error: "User not found" });
        }
        res.send(user);
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

    // Update user details by id
    app.put("/user/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updatedUser = req.body;

        const result = await usersCollections.updateOne(
          { _id: new ObjectId(id) },
          { $set: updatedUser },
        );

        if (result.matchedCount === 0) {
          return res.status(404).send({ error: "User not found" });
        }

        res.send({ success: true, message: "User updated successfully" });
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
