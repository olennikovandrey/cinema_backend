const Movie = require("../models/movie.model");

class movieController {
  async add(req, res) {
    try {
      const {title, country, year, genre, slogan, producer, producerLink, description, duration, age, rating, actors, image} = req.body;
      const candidate = await Movie.findOne({title});
      if (candidate) {
        return res.status(400).json({message: "Movie already exists"});
      };
      const movie = new Movie({title, country, year, genre, slogan, producer, producerLink, description, duration, age, rating, actors, image});
      await movie.save();

      return res.json({massage: "Successfully added"});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Adding error", e});
    }
  }

  async getAll(_, res) {
    try {
      const movies = await Movie.find();
      return res.json(movies);
    } catch (e) {
      return res.status(400).json({message: "Error", e})
    }
  }

  async getExactMovie(req, res) {
    try {
      const requestTitle = req.params.title.split("=")[1];
      const currentMovie = await Movie.findOne({title: requestTitle});
      return res.json(currentMovie)
    } catch (e) {
      return res.status(400).json({message: "Error", e})
    }
  }


  async deleteMovie(req, res) {
    try {
      const {title} = req.body;
      console.log(title)
      const movie = await Movie.findOne({title});
      await Movie.deleteOne({movie});
      return res.status(200).json({message: "Movie deleted"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }
};

module.exports = new movieController()
