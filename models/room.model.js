const { Schema, model } = require("mongoose");

const Room = new Schema([{
  title: { type: String, required: true },
  cinemaTitle: { type: String, required: true },
  seats: [
    {
      seatType: { type: String, required: true },
      row: { type: Number, required: true },
      place: { type: Number, required: true },
      isOccupied: { type: Boolean, required: true },
      isSelected: { type: Boolean }
    }
  ]
}])

module.exports = model("Room", Room);
