const pdfCreator = require("./pdfCreator");
const { mailer } = require("../services/mailer");
const fs = require("fs");

const createPDFAsync = async (seatsToBuy, movie) => {
  return new Promise((resolve, reject) => {
    try {
      pdfCreator(seatsToBuy, movie);
      resolve();
    } catch (err) {
      return reject(err.message);
    }
  });
};

const removePDFAsync = async path => {
  return new Promise((resolve, reject) => {
    try {
      const ticketsPath = "tickets.pdf";
      if (fs.existsSync(ticketsPath)) {
        fs.unlinkSync(path);
        resolve();
      };
      return resolve();
    } catch (err) {
      return reject(err.message);
    }
  });
};

const sendEmailAsync = async message => {
  return new Promise((resolve, reject) => {
    try {
      const ticketsPath = "tickets.pdf";
      let isFileExists;
      while (!fs.existsSync(ticketsPath)) {
        isFileExists = false;
      }
      if (fs.existsSync(ticketsPath)) {
        isFileExists = true;
        isFileExists && mailer(message);
        resolve();
      }
    } catch (err) {
      return reject(err.message);
    }
  });
};

module.exports = {
  createPDFAsync,
  sendEmailAsync,
  removePDFAsync
};
