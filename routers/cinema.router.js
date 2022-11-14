const Router = require("express");
const cinemaRouters = new Router();
const cinemaController = require("../controllers/cinema.controller");

cinemaRouters.get("/all", cinemaController.getCinemas);
cinemaRouters.get("/all/get", cinemaController.getAllCinemas);
cinemaRouters.get("/:title", cinemaController.getExactCinema);

module.exports = cinemaRouters
