const Router = require("express");
const cinemaRouters = new Router();
const cinemaController = require("../controllers/cinema.controller");
const adminMiddleware = require("../middleware/admin.middleware");

cinemaRouters.post("/add", adminMiddleware, cinemaController.addCinema);
cinemaRouters.get("/all", cinemaController.getCinemas);
cinemaRouters.get("/:title", cinemaController.getExactCinema);
cinemaRouters.put("/updatecinema", adminMiddleware, cinemaController.updateCinema);
cinemaRouters.delete("/deletecinema", adminMiddleware, cinemaController.deleteCinama);

module.exports = cinemaRouters
