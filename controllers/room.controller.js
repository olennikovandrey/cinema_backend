const Room = require("../models/room.model");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");

class roomController {
  async getExactRoom(req, res) {
    try {
      const roomId = req.params.room;
      const movieId = req.params.movie;
      const cinemaId = req.params.cinema;

      const room = await Room.findOne({ _id: roomId });
      const movie = await Movie.findOne({ _id: movieId });
      const workSession = await Cinema.find({
        _id: cinemaId
      },
      {
        sessions: { $elemMatch: {
          roomId: roomId,
          movieId: movieId
        } }
      });
      const session = workSession[0].sessions[0]

      return res.json({ room, movie, session });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то не так..." });
    }
  }
}

module.exports = new roomController()
