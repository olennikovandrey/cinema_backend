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

  async updateSeatInRoom(req, res) {
    try {
      const { roomId, rowNumber, seatNumber, isOccupied, isSelected } = req.body;
      const room = await Room.findOneAndUpdate({
        _id: roomId
      },
      {
        $set: {
          "rows.$[row].seats.$[seat].isSelected": isSelected,
          "rows.$[row].seats.$[seat].isOccupied": isOccupied
        }
      },
      {
        arrayFilters: [
          { "row.number": rowNumber }, { "seat.place": seatNumber }
        ],
        new: true
      });

      return res.status(200).json({ message: "Информация о кинозале успешно обновлена", room, selectedSeats });
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Что-то не так..." });
    }
  }
}

module.exports = new roomController()
