const Router = require("express");
const movieRouters = new Router();
const movieController = require("../controllers/movie.controller");

movieRouters.get("/all", movieController.getAllMovies);
movieRouters.get("/country/:country", movieController.getMovieByCountry);
movieRouters.get("/id/:id", movieController.getExactMovie);
movieRouters.get("/producer/:producer", movieController.getMovieByProducer);
movieRouters.get("/actor/:actor", movieController.getMovieByActor);
movieRouters.get("/title/:title", movieController.getMovieByTitle);
movieRouters.get("/genre/:genre", movieController.getMovieByGenre);

module.exports = movieRouters
