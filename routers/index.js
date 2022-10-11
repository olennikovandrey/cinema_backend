const Router = require("express");
const routers = new Router();
const authRouters = require("./auth.router");

routers.use("/auth", authRouters);

module.exports = routers
