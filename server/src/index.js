import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'

import { userRouter } from './routes/users.js'

const app = express();

// Converts data from the front end into JSON
app.use(express.json());

app.use(cors());

app.use("/auth", userRouter);

// Access the admin password from environment variables
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!ADMIN_PASSWORD) {
  console.error('No admin password provided in environment variables');
  process.exit(1);
}

// Use the admin password in the MongoDB connection string
mongoose.connect(
  `mongodb+srv://airportsushi:${ADMIN_PASSWORD}@recipes.xjc06bf.mongodb.net/recipes?retryWrites=true&w=majority&appName=recipes`
)
  .then(() => {
    console.log("MongoDB connected successfully");
    // Start the server after successfully connecting to MongoDB
    app.listen(3001, () => console.log("Server started"));
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
