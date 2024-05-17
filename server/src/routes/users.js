import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Request to mongodb
    const user = await UserModel.findOne({ username: username });

    // Trying to register existing user
    if (user) {
      return res.json({ message: "User already exists!" })

    }

    // Hashes password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Adding new user to DB
    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User Registered Successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/login");

export { router as userRouter }; 