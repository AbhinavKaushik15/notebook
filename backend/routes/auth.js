import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import fetchUser from "../middleware/fetchUser.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // email Validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    // user already exists
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save Data into Database

    const newUser = await User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log(newUser);

    res.status(200).json({ success: "Signup Successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // validation
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // email validation
    if (!email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email" });
    }

    // find a unique user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    // matching user password to hash password with bcrypt.compare()
    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      const token = jwt.sign({ userId: user.id }, "" + process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(201).json({ token, success: "Login Successfully." });
    } else {
      res.status(404).json({ error: "Email & Password not found!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/getuser", fetchUser, async (req, res) => {
  try {
    const userId = req.userId;
    console.log("getUser Id", userId);
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

export default router;
