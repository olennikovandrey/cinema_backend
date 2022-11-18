const Movie = require("../models/movie.model");

class movieController {
  async getAllMovies(_, res) {
    try {
      const movies = await Movie.find();
      return res.json(movies);
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getExactMovie(req, res) {
    try {
      const requestId = req.params.id.split("=")[1];
      const movies = await Movie.findOne({ _id: requestId });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getMovieByProducer(req, res) {
    try {
      const requestProducer = req.params.producer.split("=")[1];
      const regex = new RegExp(requestProducer, "i");
      const movies = await Movie.find({
        producer: { $elemMatch: {
          name: { $regex: regex }
        }}
      });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getMovieByActor(req, res) {
    try {
      const requestActor = req.params.actor.split("=")[1];
      const regex = new RegExp(requestActor, "i");
      const movies = await Movie.find({
        actors: { $elemMatch: {
          name: { $regex: regex }
        }}
      });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getMovieByCountry(req, res) {
    try {
      const requestCountry = req.params.country.split("=")[1];
      const regex = new RegExp(requestCountry, "i");
      const movies = await Movie.find({
        country: { $regex: regex }
      });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getMovieByTitle(req, res) {
    try {
      const requestTitle = req.params.title.split("=")[1];
      const regex = new RegExp(requestTitle, "i");
      const movies = await Movie.find({
        title: { $regex: regex }
      });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }

  async getMovieByGenre(req, res) {
    try {
      const requestGenre = req.params.genre.split("=")[1];
      const regex = new RegExp(requestGenre, "i");
      const movies = await Movie.find({
        genre: { $regex: regex }
      });
      return res.json(movies)
    } catch (e) {
      return res.status(400).json({ message: "Error", e })
    }
  }
};

module.exports = new movieController()
