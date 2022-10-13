const Router = require("express");
const routers = new Router();
const authRouters = require("./auth.router");
const movieRouters = require("./movie.router");

routers.use("/auth", authRouters);
routers.use("/movies", movieRouters);

module.exports = routers
