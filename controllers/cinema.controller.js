const Cinema = require("../models/cinema.model");

class cinemaController {
  async addCinema(req, res) {
    try {
      const {title, location, sessions} = req.body;
      const candidate = await Cinema.findOne({title});
      if (candidate) {
        return res.status(400).json({message: "Cinema already exists"});
      };

      const cinema = new Cinema({title, location, sessions});
      await cinema.save();

      return res.status(200).json({massage: "Successfully added"});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Adding error"});
    }
  }

  async getCinemas(_, res) {
    try {
      const cinemas = await Cinema.find();
        return res.json(cinemas);
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }

  async getExactCinema(req, res) {
    try {
      const title = req.params.title.split("=")[1];
      const cinema = await Cinema.findOne({title});
        return res.json(cinema);
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
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

  async deleteCinama(req, res) {
    try {
      const {title} = req.body;
      const cinema = await Cinema.findOne({title});
      if (!cinema) {
        return res.status(400).json({message: "No any matches in database to your request"});
      }
      await Cinema.deleteOne({title});
      return res.status(200).json({message: "User deleted"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }
};

module.exports = new cinemaController()
