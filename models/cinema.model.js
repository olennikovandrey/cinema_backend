const { Schema, model } = require("mongoose");

const Cinema = new Schema({
  title: { type: String, required: true, unique: true },
  location: { type: String, required: true },
  sessions: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
      movieId: { type: Schema.Types.ObjectId },
      totalSeats: { type: Number, required: true },
      vacancySeats: { type: Number },
      busySeats: { type: Number },
    }
  ]
})

module.exports = model("Cinema", Cinema);
