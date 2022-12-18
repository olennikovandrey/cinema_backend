const pdf = require("pdf-creator-node");
const fs = require("fs");
const html = fs.readFileSync("services/template.html", "utf8");

const pdfCreator = async (seats, movie) => {
  let result;
  const document = {
    html: html,
    data: {
      seats: seats,
    },
    path: "tickets.pdf",
    type: "",
  };

  const options = {
    format: "A4",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: `<div style="text-align: center;">${ movie.title }</div>`
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            last: 'Last Page'
        }
    }
};

  pdf.create(document, options);
  result = true;
  return result;
};

module.exports = pdfCreator;
