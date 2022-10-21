const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/index");
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", router);

const start = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/Cinema", {useUnifiedTopology: true, useNewUrlParser: true});
    console.log("DB connected");
    app.listen(4000, () => {console.log("Server OK")});
  } catch (err) {
    console.log(err);
  };
};

start();