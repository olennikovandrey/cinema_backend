const Cinema = require("../models/cinema.model");

class cinemaController {
  async getCinemas(_, res) {
    try {
      const cinemas = await Cinema.find();
        return res.json(cinemas);
    } catch (e) {
      res.status(400).json({ message: "Something wrong", e });
    }
  }

  async getExactCinema(req, res) {
    try {
      const title = req.params.title.split("=")[1];
      const cinema = await Cinema.findOne({ title });
        return res.json(cinema);
    } catch (e) {
      res.status(400).json({ message: "Something wrong", e });
    }
  }

  async getAllCinemas(_, res) {
    try {
      const allCinemas = await Cinema.aggregate([
        {
          $lookup:
            {
              from: "movies",
              localField: "sessions.movieId",
              foreignField: "_id",
              as: "movies"
            }
        },
        {
          $lookup:
            {
              from: "rooms",
              localField: "sessions.roomId",
              foreignField: "_id",
              as: "rooms"
            }
        },
      ]);
      return res.json({ allCinemas });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то не так..." });
    }
  }
};

module.exports = new cinemaController()
