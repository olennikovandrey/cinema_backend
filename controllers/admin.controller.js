const User = require("../models/user.model");
const Cinema = require("../models/cinema.model");
const Movie = require("../models/movie.model");

class adminController {
  async getUsers(_, res) {
    try {
      const users = await User.find();
        return res.json(users);
    } catch (e) {
      res.status(400).json({ message: "Что-то не так...", e });
    }
  }

  async deleteUser(req, res) {
    try {
      const { email } = req.body;
      const result = await User.deleteOne({ email });
      const users = await User.find();

      return result.deletedCount ?
        res.json({ message: "Пользователь удален", users }) :
        res.status(400).json({ message: "Что-то не так..." })

    } catch (e) {
      res.status(400).json({ message: "Что-то не так...", e });
    }
  }

  async addCinema(req, res) {
    try {
      const { title, location, sessions } = req.body;
      const candidate = await Cinema.findOne({ title });
      if (candidate) {
        return res.status(400).json({ message: "Такой кинотеатр уже существует" });
      };

      const cinema = new Cinema({ title, location, sessions });
      await cinema.save();

      return res.status(200).json({ message: "Кинотеатр успешно добавлен" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то не так..." });
    }
  }

  async updateCinema(req, res) {
    try {
      const { title, sessions } = req.body;
      const cinema = await Cinema.findOne({ title });
      if (!cinema) {
        return res.status(400).json({ message: "По Вашему запросу совпадений не найдено" });
      }
      await Cinema.findOneAndUpdate(
        { title },
        {
          $set: {
            sessions: sessions
          }
        }
      );
      return res.status(200).json({ message: "Кинотеатр успешно обновлен" });
    } catch (e) {
      res.status(400).json({ message: "Что-то не так...", e });
    }
  }

  async deleteCinema(req, res) {
    try {
      const { title } = req.body;
      const cinema = await Cinema.findOne({ title });
      if (!cinema) {
        return res.status(400).json({ message: "По Вашему запросу совпадений не найдено" });
      }
      await Cinema.deleteOne({ title });
      return res.status(200).json({ message: "Кинотеатр успешно удален" });
    } catch (e) {
      res.status(400).json({ message: "Что-то не так...", e });
    }
  }

  async addMovie(req, res) {
    try {
      const { title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image, youtubeIframe, crop } = req.body;
      const candidate = await Movie.findOne({ title });
      if (candidate) {
        return res.status(400).json({ message: "Такой фильм уже существует" });
      };
      const movie = new Movie({ title, country, year, genre, slogan, producer, description, duration, age, rating, actors, image, youtubeIframe, crop });
      await movie.save();

      return res.status(200).json({ message: "Фильм успешно добавлен" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка во время добавления фильма. Возможно, не все обязательные поля заполнены", e });
    }
  }

  async updateMovie(req, res) {
    try {
      const { title, country, year, genre, slogan, producer, description, duration, age, rating, image, youtubeIframe, crop } = req.body;
      const movie = await Movie.findOne({ title });
      if (!movie) {
        return res.status(400).json({ message: "Такого фильма не существует" });
      }
      await Movie.findOneAndUpdate(
        { title },
        {
          $set: {
            country: country,
            year: year,
            genre: genre,
            slogan: slogan,
            producer: producer,
            description: description,
            duration: duration,
            age: age,
            rating: rating,
            image: image,
            youtubeIframe: youtubeIframe,
            crop: crop
          }
        }
      );
      return res.status(200).json({ message: "Информация о фильме успешно обновлена" });
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Что-то не так..." });
    }
  }

  async deleteMovie(req, res) {
    try {
      const { title } = req.body;
      const result = await Movie.deleteOne({ title });
      const movies = await Movie.find();

      return result.deletedCount ?
        res.json({message: "Фильм успешно удален", movies }) :
        res.status(400).json({ message: "Что-то не так..." });
    } catch (e) {
      res.status(400).json({ message: "Что-то не так...", e });
    }
  }
};

module.exports = new adminController()
