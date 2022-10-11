const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routers/index");

const app = express();
app.use(express.json());
app.use("/", routers);

const start = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/Users", {useUnifiedTopology: true, useNewUrlParser: true});
    console.log("DB connected");
    app.listen(3000, () => {console.log("Server OK")});
  } catch (err) {
    console.log(err);
  };
};

start();
