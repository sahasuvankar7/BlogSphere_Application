const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifyToken");

// CREATE
router.post("/create",verifyToken, async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE comment

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});



// DELETE USER

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json("Comment has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});



// // GET Post details

// router.get("/:id", async (req, res) => {
//   try {
//     const Comment = await Comment.findById(req.params.id);

//     res.status(200).json(post);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// GET Posts

// router.get("/", async (req, res) => {
//   try {
//     const postS = await Post.find();

//     res.status(200).json(postS);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });


// GET Post comments

router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({postId:req.params.postId});
    // console.log(comments)

    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
