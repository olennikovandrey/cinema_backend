const Router = require("express");
const adminRouters = new Router();
const adminController = require("../controllers/admin.controller");
const adminMiddleware = require("../middleware/admin.middleware");

adminRouters.get("/users", adminMiddleware, adminController.getUsers);
adminRouters.delete("/deleteuser", adminMiddleware, adminController.deleteUser);
adminRouters.post("/addcinema", adminController.addCinema);
adminRouters.put("/updatecinema", adminController.updateCinema);
adminRouters.delete("/deletecinema", adminController.deleteCinema);
adminRouters.post("/addmovie", adminController.addMovie);
adminRouters.delete("/deletemovie", adminController.deleteMovie);

module.exports = adminRouters
