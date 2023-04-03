const express = require("express");
const router = express.Router();
const userModel = require("../models/user");

router.get("/", (req, res) => {
  console.log(req.query);
  userModel.find({}, (err, users) => {
    if (!err) {
      return res.json(users);
    }
    res.status(500).send("DB Error");
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  userModel.find({ _id: id }, (err, user) => {
    if (!err) {
      return res.json(user);
    }
    res.status(500).send("DB Error");
  });
});

router.post("/", (req, res) => {
  console.log(req.body);
  const userData = {
    ...req.body,
  };
  const user = new userModel(userData);
  user.save((err, savedUser) => {
    if (!err) {
      return res.json(savedUser);
    }
    res.status(500).send("DB Error");
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndDelete(id, (err, user) => {
    if (!err) {
      return res.json({ ...user._doc, message: "deleted" });
    }
    res.status(500).send("DB Error");
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndUpdate(id, req.body, (err, user) => {
    if (!err) {
      return res.json({ ...user._doc, message: "updated" });
    }
    res.status(500).send("DB Error");
  });
});

module.exports = router;
