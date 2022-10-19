const {Schema, model} = require("mongoose");

const Movie = new Schema({
  title: {type: String, required: true, unique: true},
  country: {type: [String], required: true},
  year: {type: String, required: true},
  genre: {type: [String], required: true},
  slogan: {type: String, required: true},
  producer: {type: [
    {
      name: {type: String, required: true },
      link: {type: String, required: true },
    }
  ], required: true},
  description: {type: String, required: true},
  duration: {type: String, required: true},
  age: {type: String},
  rating: {type: String, required: true},
  actors: {type: [
    {
      name: {type: String, required: true },
      link: {type: String, required: true },
      image: {type: String}
    }
  ], required: true},
  image: {type: String, required: true}
})

module.exports = model("Movie", Movie);
