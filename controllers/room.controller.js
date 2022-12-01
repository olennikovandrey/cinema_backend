const Room = require("../models/room.model");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

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
      const { roomId, movieId, cinemaId } = req.params;
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

  async massUnselectSeatsInRoom(req, res) {
    try {
      const selectedSeats = req.body;

      selectedSeats.forEach(async (el) => {
        await Cinema.findOneAndUpdate({
          _id: el.cinemaId
        },
        {
          $set: {
            "sessions.$[session].rows.$[row].seats.$[seat].isSelected": false
          }
        },
        {
          arrayFilters: [
            { "session._id": el.sessionId },
            { "row.number": el.rowNumber },
            { "seat.place": el.seatNumber }
          ],
          new: true
        });
      });

      const workSession = await Cinema.find({
        _id: selectedSeats[0].cinemaId
      },
      {
        sessions: { $elemMatch: {
          _id: selectedSeats[0].sessionId
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
      const selectedSeats = req.body;

      selectedSeats.forEach(async (el) => {
        await Cinema.findOneAndUpdate({
          _id: el.cinemaId
        },
        {
          $set: {
            "sessions.$[session].rows.$[row].seats.$[seat].isOccupied": true
          }
        },
        {
          arrayFilters: [
            { "session._id": el.sessionId },
            { "row.number": el.rowNumber },
            { "seat.place": el.seatNumber }
          ],
          new: true
        });
      });

      const workSession = await Cinema.find({
        _id: selectedSeats[0].cinemaId
      },
      {
        sessions: { $elemMatch: {
          _id: selectedSeats[0].sessionId
        } }
      });

      const session = workSession[0].sessions[0]

      return res.status(200).json({ message: "Место (места) успешно выкуплено", session });
    } catch (e) {
      console.log(e)
      return res.status(400).json({ message: "Что-то не так..." });
    }
  }

  async payment(req, res) {
    const { amount, id } = req.body;

    try {
      await stripe.paymentIntents.create({
        amount: amount / 2.5 * 100,
        currency: "byn",
        description: "Оплата за билеты",
        payment_method: id,
        confirm: true
      })
      return res.json({
        message: "Оплата успешно произведена",
        success: true
      });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Оплата не произведена, попытайтесь еще раз", success: false });
    }
  }
}

module.exports = new roomController()
