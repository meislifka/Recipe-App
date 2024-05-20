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

    res.json({ message: "User Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username: username });

  if (!user) {
    return res.json({ message: "User Doesn't Exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.json({ message: "Username or Password is Incorrect!" });
  }

  const TOKEN = process.env.TOKEN;

  const token = jwt.sign({ id: user._id }, TOKEN);
  res.json({ token, userID: user._id });

});

export { router as userRouter }; 