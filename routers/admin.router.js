const Router = require("express");
const adminRouters = new Router();
const adminController = require("../controllers/admin.controller");

adminRouters.get("/users/getallusers", adminController.getAllUsers);
adminRouters.post("/cinemas/addcinemas", adminController.addCinema);
adminRouters.post("/rooms/addrooms", adminController.addRoom);
adminRouters.post("/movies/addmovies", adminController.addMovie);
adminRouters.post("/sessions/addsessions", adminController.addSession);
adminRouters.put("/movies/updatemovies", adminController.updateMovie);
adminRouters.put("/sessions/updatesession", adminController.updateSession);
adminRouters.delete("/users/deleteusers", adminController.deleteUser);
adminRouters.delete("/cinemas/deletecinemas", adminController.deleteCinema);
adminRouters.delete("/movies/deletemovies", adminController.deleteMovie);
adminRouters.delete("/sessions/deletesessions", adminController.deleteSession);

module.exports = adminRouters
