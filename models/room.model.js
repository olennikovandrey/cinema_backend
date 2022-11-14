const { Schema, model } = require("mongoose");

const Room = new Schema([{
  title: { type: String, required: true },
  cinemaTitle: { type: String, required: true },
  rows: [
    {
      number: { type: Number, required: true },
      seatType: { type: String, required: true },
      price: { type: Number, required: true },
      seats: [
        {
          place: { type: Number, required: true },
          isOccupied: { type: Boolean, required: true },
          isSelected: { type: Boolean }
        }
      ]
    }
  ]
}])

module.exports = model("Room", Room);
