import express from "express";
const router = express.Router();
import User from "../models/User.js";

const logHeader = (req, res, next) => {
  console.log(req.headers);
  next();
};

router.get("/", logHeader, (req, res) => {
  User.find({}, (err, result) => {
    if (err) res.status(500).json({ err: err.message });
    res.json({ users: result });
  });
});

router.post("/create", (req, res) => {
  if (req.body.name && req.body.password) {
    User.create(
      { name: req.body.name, password: req.body.password },
      (err, result) => {
        if (err) res.status(400).json({ err: err.message });
        console.log(result);
        res.json({ message: result });
      }
    );
  } else {
    res.json({ error: "name or password not defined!" });
  }
});

router.post("/update/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name, password: req.body.password },
    (err, result) => {
      if (err) res.status(400).json({ err: err.message });
      else {
        res.json({ result: result });
      }
    }
  );
});

router.post("/users/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.get("/find/:username", (req, res) => {
  User.find({ name: req.params.username }, (err, result) => {
    if (err) res.status(400).json({ err: err.message });
    else {
      res.json({ result: result });
    }
  });
});

router.delete("/delete/:id", (req, res) => {
  User.findById(req.params.id, (err, result) => {
    if (result == null) {
      res.status(404).json({ err: "user not found" });
    } else {
      User.deleteOne({ _id: req.params.id }, () => {
        if (err) res.status(400).json({ err: err.message });
        else {
          res.json({ result: result });
        }
      });
    }
  });
});

export default router;
