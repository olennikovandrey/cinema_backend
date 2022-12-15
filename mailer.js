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

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err);
    console.log("Email sent: ", info)
  })
}

module.exports = mailer;
