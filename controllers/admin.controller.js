const User = require("../models/user.model");
const Cinema = require("../models/cinema.model");
const Movie = require("../models/movie.model");

class adminController {
  async getUsers(_, res) {
    try {
      const users = await User.find();
        return res.json(users);
    } catch (e) {
      res.status(400).json({message: "Что-то не так...", e});
    }
  }

  async deleteUser(req, res) {
    try {
      const {email} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: "По Вашему запросу не найдено совпадений"});
      }
      await User.deleteOne({email});
      return res.status(200).json({message: "Пользователь удален"});
    } catch (e) {
      res.status(400).json({message: "Что-то не так...", e});
    }
  }

  async addCinema(req, res) {
    try {
      const {title, location, sessions} = req.body;
      const candidate = await Cinema.findOne({title});
      if (candidate) {
        return res.status(400).json({message: "Cinema already exists"});
      };

      const cinema = new Cinema({title, location, sessions});
      await cinema.save();

      return res.status(200).json({message: "Successfully added"});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Adding error"});
    }
  }

  async updateCinema(req, res) {
    try {
      const {title, sessions} = req.body;
      const cinema = await Cinema.findOne({title});
      if (!cinema) {
        return res.status(400).json({message: "No any matches in database to your request"});
      }
      await Cinema.findOneAndUpdate(
        {title},
        {
          $set: {
            sessions: sessions
          }
        }
      );
      return res.status(200).json({message: "Cinema updated"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }

  async deleteCinema(req, res) {
    try {
      const {title} = req.body;
      const cinema = await Cinema.findOne({title});
      if (!cinema) {
        return res.status(400).json({message: "No any matches in database to your request"});
      }
      await Cinema.deleteOne({title});
      return res.status(200).json({message: "Cinema deleted"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }

  async addMovie(req, res) {
    try {
      const {title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image} = req.body;
      const candidate = await Movie.findOne({title});
      if (candidate) {
        return res.status(400).json({message: "Такой фильм уже существует"});
      };
      const movie = new Movie({title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image});
      await movie.save();

      return res.status(200).json({message: "Фильм успешно добавлен"});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Ошибка во время добавления фильма. Возможно, не все обязательные поля заполнены", e});
    }
  }

  async deleteMovie(req, res) {
    try {
      const {title} = req.body;
      await Movie.deleteOne({title});
      return res.status(200).json({message: "Фильм успешно удален"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }
};

module.exports = new adminController()
