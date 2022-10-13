const Router = require("express");
const movieRouters = new Router();
const movieController = require("../controllers/movie.controller");
const adminMiddleware = require("../middleware/admin.middleware");

movieRouters.post("/add", adminMiddleware, movieController.add);
movieRouters.get("/all", movieController.getAll);
movieRouters.get("/:title", movieController.getExactMovie);
movieRouters.delete("/deletemovie", adminMiddleware, movieController.deleteMovie);

module.exports = movieRouters
