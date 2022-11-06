const { Schema, model } = require("mongoose");

const Cinema = new Schema({
  title: { type: String, required: true, unique: true },
  sessions: {
    type: [
      {
        date: { type: String, required: true },
        time: { type: String, required: true },
        roomId: { type: Schema.Types.ObjectId, required: true },
        movieId: { type: Schema.Types.ObjectId, required: true }
      }
    ], required: true
  }
})
module.exports = model("Cinema", Cinema);
