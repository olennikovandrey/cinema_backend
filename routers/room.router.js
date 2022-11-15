const Router = require("express");
const roomRouters = new Router();
const roomController = require("../controllers/room.controller");

roomRouters.get("/id/cinema=:cinema&room=:room&movie=:movie", roomController.getExactRoom);
roomRouters.get("/getallrooms", roomController.getAllRooms);

module.exports = roomRouters
