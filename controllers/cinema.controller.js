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
};

module.exports = new cinemaController()
