const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../verifyToken");
const Comment = require("../models/Comment");
const User = require("../models/User");
// const bcrypt = require("../models/bcrypt");

// CREATE
router.post("/create", verifyToken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedUser = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });

    res.status(200).json("Post has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Post details

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET Posts

// routes/posts.js
router.get("/", async (req, res) => {
  const query = req.query;
  // console.log(query);
  try {
    let posts;
    if (query.search) {
      const searchFilter = { title: { $regex: query.search, $options: "i" } };
      posts = await Post.find(searchFilter);
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET User Posts

router.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const postS = await Post.find({ userId: req.params.userId });

    res.status(200).json(postS);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
