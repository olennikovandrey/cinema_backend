const Room = require("../models/room.model");
const Movie = require("../models/movie.model");
const Cinema = require("../models/cinema.model");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const mailer = require("../mailer");

const getCinemaTitle = async seatsToBuy => {
  const currentCinema = await Cinema.find({
    _id: seatsToBuy[0].cinemaId
  });

  return currentCinema[0].title;
};

const getMovie = async session => {
  const currentMovie = await Movie.find({
    _id: session.movieId
  });

  return currentMovie[0];
};

const getSession = async seatsToBuy => {
  const workSession = await Cinema.find({
    _id: seatsToBuy[0].cinemaId
  },
  {
    sessions: { $elemMatch: {
      _id: seatsToBuy[0].sessionId
    } }
  });

  return workSession[0].sessions[0];
};

const getRoomNumber = async session => {
  const currentRoom = await Room.find({
    _id: session.roomId
  });

  return currentRoom[0].title.includes("1") ? "Зал 1" : "Зал 2";
};

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
      const { seatsToBuy, email } = req.body;
      const cinemaTitle = await getCinemaTitle(seatsToBuy);
      const currentSession = await getSession(seatsToBuy);
      const movie = await getMovie(currentSession);
      const roomNumber = await getRoomNumber(currentSession);
      const { date, time } = currentSession;
      const ticketsToEmail = seatsToBuy => {
        return seatsToBuy.map(({ rowNumber, type, price, seatNumber }) => {
          return `<span style="margin: 0 0 8px 10px;"><b>ряд: </b>${ rowNumber }, <b>место: </b>${ seatNumber }, <b>тип места: </b>${ type }, <b>цена: </b>${ price }.00 BYN</span>`
        })
      };

      const getActors = movie => {
        return movie.actors.map(({ name, link }) => {
          return `<a href="${ link }" target="_blank">${ name }</a>`
        })
      };

      const message = {
        to: email,
        subject: "Ваши билеты",
        html: `
          <style>
            div, h2, h3, h4, span, p, a {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              color: #fff;
              transition: .2s;
            }
            a {
              text-decoration: none;
            }
            a:hover {
              color: #f8d1d1;
            }
            .crop {
              background: url('${ movie.crop }') 40% 25%;
              border-radius: 6px;
              box-shadow: rgb(255 255 255 / 35%) 0px 0px 0px 1px inset;
              border: 1px solid rgba(121, 121, 121, 0.2);
            }
            .wrapper {
              box-sizing: border-box;
              background: rgba(0, 0, 0, 0.70);
              border-radius: 6px;
              padding: 15px;
            }
          </style>
          <div class="crop">
            <div class="wrapper">
              <h2 style="margin-bottom: 25px;">Вы успешно приобрели билеты на киносеанс!</h3>
              <h3 style="margin-bottom: 20px;">${ movie.title }, кинотеатр ${ cinemaTitle } / ${ roomNumber }. ${ date } в ${ time }.</h3>
              <div style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 15px;">
                <p style="margin-bottom: 10px;"><b>Страна: </b>${ movie.country.join(", ") }.</p>
                <p style="margin-bottom: 10px;"><b>Продолжительность: </b>${ movie.duration }.</p>
                <p style="margin-bottom: 10px;"><b>В ролях: </b>${ getActors(movie).join(", ") }.</p>
                <p style="margin-bottom: 10px;"><b>Описание: </b>${ movie.description }</p>
              </div>
              <div style="display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 25px;">
                <h3  style="margin-bottom: 12px;">Ваши места:</h3>
                ${ ticketsToEmail(seatsToBuy).join("") }
              </div>
              <p>Это письмо отправлено автоматически. Отвечать на него не требуется.</p>
            </div>
          </div>
        `
      };

      seatsToBuy.forEach(async (el) => {
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
        _id: seatsToBuy[0].cinemaId
      },
      {
        sessions: { $elemMatch: {
          _id: seatsToBuy[0].sessionId
        } }
      });

      const session = workSession[0].sessions[0];

      mailer(message);

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
