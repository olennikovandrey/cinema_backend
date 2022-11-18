const Router = require("express");
const adminRouters = new Router();
const adminController = require("../controllers/admin.controller");

adminRouters.get("/users/getallusers", adminController.getAllUsers);
adminRouters.delete("/users/deleteusers", adminController.deleteUser);
adminRouters.post("/cinemas/addcinemas", adminController.addCinema);
adminRouters.put("/cinemas/updatecinemas", adminController.updateCinema);
adminRouters.delete("/cinemas/deletecinemas", adminController.deleteCinema);
adminRouters.post("/movies/addmovies", adminController.addMovie);
adminRouters.put("/movies/updatemovies", adminController.updateMovie);
adminRouters.delete("/movies/deletemovies", adminController.deleteMovie);
adminRouters.post("/rooms/addrooms", adminController.addRoom);

module.exports = adminRouters
