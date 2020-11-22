const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const User = require("./models/user");

const mongoose = require("mongoose");
const { default: Axios } = require("axios");
mongoose.set("useCreateIndex", true);
mongoose.connect("mongodb+srv://khalil:khalil@cluster0.vlaza.mongodb.net/extralove?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected");
});

const app = express();

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "./client/dist"));
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("/home", (req, res) => {
  console.log("hello");
  res.send("hello");
});

app.post("/api/users", (req, res) => {
  User.create(req.body)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.get("/api/users", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });

  // try {
  //   var user = await User.find(req.body);
  //   res.send(user);
  // } catch (err) {
  //   res.send(err);
  // }
});

app.delete("/api/users/:_id", (req, res) => {
  User.findByIdAndRemove({ _id: req.params._id }, { useFindAndModify: true }).then((result) => {
    res.send(result);
  });
});

app.put("/api/users/:_id", (req, res) => {
  User.findByIdAndUpdate({ _id: req.params._id }, req.body, { new: true }).then((result) => {
    res.send(result);
  });
});

app.listen(3000, () => {
  console.log("app running on http://localhost:3000");
});
