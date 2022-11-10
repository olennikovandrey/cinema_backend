const Router = require("express");
const roomRouters = new Router();
const roomController = require("../controllers/room.controller");

roomRouters.get("/id/:id", roomController.getExactRoom);

module.exports = roomRouters
