const { Schema, model } = require("mongoose");

const Cinema = new Schema({
  title: { type: String, required: true, unique: true },
  sessions: [
    {
      date: { type: String, required: true },
      time: { type: String, required: true },
      roomId: { type: Schema.Types.ObjectId },
      movieId: { type: Schema.Types.ObjectId }
    }
  ]
})

module.exports = model("Cinema", Cinema);
