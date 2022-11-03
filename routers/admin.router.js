const Router = require("express");
const adminRouters = new Router();
const adminController = require("../controllers/admin.controller");

adminRouters.get("/users", adminController.getUsers);
adminRouters.delete("/deleteuser", adminController.deleteUser);
adminRouters.post("/cinema/add", adminController.addCinema);
adminRouters.put("/cinema/update", adminController.updateCinema);
adminRouters.delete("/cinema/delete", adminController.deleteCinema);
adminRouters.post("/addmovie", adminController.addMovie);
adminRouters.put("/updatemovie", adminController.updateMovie);
adminRouters.delete("/deletemovie", adminController.deleteMovie);
adminRouters.post("/room/add", adminController.addRoom);

module.exports = adminRouters
