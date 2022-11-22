const Room = require("../models/room.model");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");

class roomController {
  async getAllRooms(_, res) {
    try {
      const rooms = await Room.find();
      return res.json({ rooms });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Что-то не так..." });
    }
  }

  async getExactRoom(req, res) {
    try {
      const roomId = req.params.roomId;
      const movieId = req.params.movieId;
      const cinemaId = req.params.cinemaId;

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

  async selectSeatInRoom(req, res) {
    try {
      const { cinemaId, sessionId, rowNumber, seatNumber, isSelected } = req.body;
      await Cinema.findOneAndUpdate({
        _id: cinemaId
      },
      {
        $set: {
          "sessions.$[session].rows.$[row].seats.$[seat].isSelected": isSelected
        }
      },
      {
        arrayFilters: [
          { "session._id": sessionId },
          { "row.number": rowNumber },
          { "seat.place": seatNumber }
        ],
        new: true
      });

      const workSession = await Cinema.find({
        _id: cinemaId
      },
      {
        sessions: { $elemMatch: {
          _id: sessionId
        } }
      });

      const session = workSession[0].sessions[0]

      return res.status(200).json({ message: "Место успешно выбрано", session });
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Что-то не так..." });
    }
  }

  async occupiSeatInRoom(req, res) {
    try {
      const { roomId, seatsToBuy } = req.body;
      console.log({roomId})
      console.log({seatsToBuy})


      const room = await Room.updateMany({
        _id: roomId
      },
      {

      },
      {
        new: true
      });

      return res.status(200).json({ message: "Место (места) успешно выкуплено", room });
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Что-то не так..." });
    }
  }
}

module.exports = new roomController()
