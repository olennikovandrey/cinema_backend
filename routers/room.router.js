const Router = require("express");
const roomRouters = new Router();
const roomController = require("../controllers/room.controller");

roomRouters.get("/id/cinemaId=:cinemaId&roomId=:roomId&movieId=:movieId", roomController.getExactRoom);
roomRouters.get("/getallrooms", roomController.getAllRooms);
roomRouters.put("/updateroom", roomController.updateSeatInRoom)

module.exports = roomRouters
