const Router = require("express");
const roomRouters = new Router();
const roomController = require("../controllers/room.controller");

roomRouters.get("/id/cinemaId=:cinemaId&roomId=:roomId&movieId=:movieId", roomController.getExactRoom);
roomRouters.get("/getallrooms", roomController.getAllRooms);
roomRouters.put("/selectseat", roomController.selectSeatInRoom);
roomRouters.put("/occupiseat", roomController.occupiSeatInRoom);
roomRouters.put("/massunselectseats", roomController.massUnselectSeatsInRoom)

module.exports = roomRouters
