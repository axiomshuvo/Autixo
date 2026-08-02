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
    const bookingsCollections = database.collection("bookings");

    // GET All Cars Info with pagination [per page limit 12]
    app.get("/cars", async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 12;
        const search = req.query.search?.toString() || "";
        const carType = req.query.carType?.toString() || "";

        const filter = {};

        if (search) {
          filter.carName = {
            $regex: search,
            $options: "i",
          };
        }

        if (carType) {
          filter.carType = {
            $in: [carType],
          };
        }

        const skip = (page - 1) * limit;

        const cars = await carsCollections
          .find(filter)
          .skip(skip)
          .limit(limit)
          .toArray();

        const totalCars = await carsCollections.countDocuments(filter);

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

    // Add Bookings to the database

    app.post("/bookings", async (req, res) => {
      try {
        const newBooking = req.body;
        console.log("New Booking Request:", newBooking);

        // 1. Find Car
        const car = await carsCollections.findOne({
          _id: new ObjectId(newBooking.carId),
        });

        if (!car) {
          return res.status(404).send({
            success: false,
            message: "Car not found",
          });
        }

        // 2. Prevent owner from booking their own car
        if (car.ownerId && car.ownerId === newBooking.userId) {
          return res.status(403).send({
            success: false,
            message: "You cannot book your own car",
          });
        }

        // 3. Check Availability
        if (car.availabilityStatus !== "Available") {
          return res.status(400).send({
            success: false,
            message: "Car is not available for booking",
          });
        }

        // 4. Create Booking
        const bookingResult = await bookingsCollections.insertOne(newBooking);

        // 5. Update Car
        await carsCollections.updateOne(
          { _id: new ObjectId(newBooking.carId) },
          {
            $set: {
              availabilityStatus: "Booked",
            },
            $inc: {
              bookingCount: 1,
            },
          },
        );

        console.log(
          `New booking added with id: ${bookingResult.insertedId}, User: ${newBooking.userId}`,
        );

        res.status(201).send({
          success: true,
          message: "Booking created successfully",
          bookingId: bookingResult.insertedId,
        });
      } catch (error) {
        console.error("Booking Error:", error);

        res.status(500).send({
          success: false,
          message: error.message,
        });
      }
    });

    // Get Bookings by User ID
    app.get("/bookings/user/:userId", async (req, res) => {
      try {
        const { userId } = req.params;

        if (!userId) {
          return res.status(400).send({
            success: false,
            message: "User ID is required",
          });
        }

        const bookings = await bookingsCollections
          .aggregate([
            {
              $match: {
                userId,
              },
            },
            {
              $lookup: {
                from: "cars",
                let: {
                  carObjectId: {
                    $toObjectId: "$carId",
                  },
                },
                pipeline: [
                  {
                    $match: {
                      $expr: {
                        $eq: ["$_id", "$$carObjectId"],
                      },
                    },
                  },
                ],
                as: "car",
              },
            },
            {
              $unwind: {
                path: "$car",
                preserveNullAndEmptyArrays: true,
              },
            },
          ])
          .toArray();

        res.status(200).send(bookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);

        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
      }
    });

    // delete booking by id
    app.delete("/bookings/:id", async (req, res) => {
      try {
        const { id } = req.params;

        if (!id) {
          return res.status(400).send({
            success: false,
            message: "Booking ID is required",
          });
        }

        // Find the booking to get the carId
        const booking = await bookingsCollections.findOne({
          _id: new ObjectId(id),
        });

        if (!booking) {
          return res.status(404).send({
            success: false,
            message: "Booking not found",
          });
        }

        // Delete the booking
        const result = await bookingsCollections.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).send({
            success: false,
            message: "Booking not found",
          });
        }

        // Update the car's availability status to "Available"
        await carsCollections.updateOne(
          { _id: new ObjectId(booking.carId) },
          {
            $set: {
              availabilityStatus: "Available",
            },
            // $inc: {
            //   bookingCount: -1,
            // },
          },
        );

        res.status(200).send({
          success: true,
          message: "Booking deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting booking:", error);

        res.status(500).send({
          success: false,
          message: "Internal Server Error",
        });
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
