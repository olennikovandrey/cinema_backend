const Router = require("express");
const movieRouters = new Router();
const movieController = require("../controllers/movie.controller");
const adminMiddleware = require("../middleware/admin.middleware");

movieRouters.post("/add", adminMiddleware, movieController.add);
movieRouters.get("/all", movieController.getAll);
movieRouters.get("/country/:country", movieController.getMovieByCountry);
movieRouters.get("/id/:id", movieController.getExactMovie);
movieRouters.get("/producer/:producer", movieController.getMovieByProducer);
movieRouters.get("/actor/:actor", movieController.getMovieByActor);
movieRouters.get("/title/:title", movieController.getMovieByTitle);
movieRouters.delete("/deletemovie", adminMiddleware, movieController.deleteMovie);

module.exports = movieRouters
