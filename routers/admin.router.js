const Router = require("express");
const adminRouters = new Router();
const adminController = require("../controllers/admin.controller");

adminRouters.get("/users/getall", adminController.getUsers);
adminRouters.delete("/users/delete", adminController.deleteUser);
adminRouters.post("/cinemas/add", adminController.addCinema);
adminRouters.put("/cinemas/update", adminController.updateCinema);
adminRouters.delete("/cinemas/delete", adminController.deleteCinema);
adminRouters.post("/movies/add", adminController.addMovie);
adminRouters.put("/movies/update", adminController.updateMovie);
adminRouters.delete("/movies/delete", adminController.deleteMovie);
adminRouters.get("/rooms/getall", adminController.getRooms);
adminRouters.post("/rooms/add", adminController.addRoom);
adminRouters.put("/rooms/update", adminController.updateSeatInRoom);

module.exports = adminRouters
