const { Schema, model } = require("mongoose");

const Movie = new Schema({
  title: { type: String, required: true, unique: true },
  country: { type: Array, required: true },
  year: { type: String, required: true },
  genre: { type: Array, required: true },
  slogan: { type: String, required: true },
  producer: { type: [
    {
      name: { type: String, required: true },
      link: { type: String },
    }
  ], required: true},
  description: { type: String, required: true },
  duration: { type: String, required: true} ,
  age: { type: String },
  rating: { type: String, required: true },
  actors: { type: [
    {
      name: { type: String, required: true },
      link: { type: String },
      image: { type: String }
    }
  ], required: true},
  youtubeIframe: { type: String },
  image: { type: String, required: true },
  crop: { type: String, required: true }
})

module.exports = model("Movie", Movie);
