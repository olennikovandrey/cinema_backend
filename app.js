const express = require("express");
const mongoose = require("mongoose");
const router = require("./routers/index");
const cors = require('cors');
const app = express();
const server = require("http").createServer(app);
const socketUtils = require("./services/socket");

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/", router);

const io = socketUtils.sio(server);
socketUtils.connection(io);

const start = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Cinema", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(
      () => {
        console.log("database connected");
        server.listen(4000, () => { console.log("Server OK") })
      },
      err => console.log(err)
    );
  } catch (err) {
    console.log(err);
  };
};

start();
