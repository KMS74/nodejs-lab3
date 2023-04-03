const express = require("express");
const router = express.Router();
const postModel = require("../models/post");

router.get("/", (req, res) => {
  postModel
    .find({}, (err, posts) => {
      if (!err) {
        return res.json(posts);
      }
      res.status(500).send("DB Error");
    })
    .populate("author");
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  postModel
    .find({ _id: id }, (err, post) => {
      if (!err) {
        return res.json(post);
      }
      res.status(500).send("DB Error");
    })
    .populate("author");
});

router.post("/", (req, res) => {
  const postData = {
    ...req.body,
  };
  const post = new postModel(postData);
  post.save((err, savedPost) => {
    if (!err) {
      return res.json(savedPost);
    }
    res.status(500).send("DB Error");
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  postModel.findByIdAndDelete(id, (err, post) => {
    if (!err) {
      return res.json({ ...post._doc, message: "deleted" });
    }
    res.status(500).send("DB Error");
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  postModel.findByIdAndUpdate(id, req.body, (err, post) => {
    if (!err) {
      return res.json({ ...post._doc, message: "updated" });
    }
    res.status(500).send("DB Error");
  });
});

module.exports = router;
