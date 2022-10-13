const {Schema, model} = require("mongoose");

const Cinema = new Schema({
  title: {type: String, required: true, unique: true},
  location: {type: String, required: true},
  sessions: [
    {
      date: String,
      time: String,
      movie: String
    }
  ]
})

module.exports = model("Cinema", Cinema);
