const {Schema, model} = require("mongoose");

const User = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  birthday: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isActive: { type: Boolean },
  role: { type: String, default: null }
})

module.exports = model("User", User);
