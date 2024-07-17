const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    console.log(err);

    res.status(500).json(err);
  }
});

//Login

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json("Wrong credentials"); // Return after sending response
    }

    const validated = await bcrypt.compare(password, user.password);
    if (!validated) {
      return res.status(401).json("Wrong credentials"); // Return after sending response
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "24h" }
    );
    const { password: pwd, ...userInfo } = user._doc;
    res.cookie("token", token).status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

// logout
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("token", {
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .send("Logged out");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Refetch user
router.get("/refetch", async (req, res) => {
  const token = req.cookies.token;
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(401).json("Unauthorized");
    }
    res.status(200).json(data);
  });
});

module.exports = router;
