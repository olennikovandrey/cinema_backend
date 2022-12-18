const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport(
  {
    host: process.env.MAIL_SERVER,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    },
    tls: {
    rejectUnauthorized: false
  }
  },
  {
    from: `Cinema tickets <${ process.env.MAIL_USERNAME }>`,
  }
);

const mailer = async message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err);

    console.log("Email sent: ", info);
  });
};

const createMessage = ({email, movie, cinemaTitle, roomNumber, date, time, seatsToBuy}) => {
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
    `,
    attachments: [
      {
        filename: "Tickets.pdf",
        path: "tickets.pdf"
      },
    ]
  };

  return message;
};

module.exports = {
  mailer,
  createMessage
};
