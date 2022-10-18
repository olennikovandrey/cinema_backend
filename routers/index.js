const Router = require("express");
const router = new Router();
const authRouters = require("./auth.router");
const movieRouters = require("./movie.router");
const cinemaRouters = require("./cinema.router");

//router.use("/admin", adminMiddleware, adminRouters);
router.use("/auth", authRouters);
router.use("/movies", movieRouters);
router.use("/cinemas", cinemaRouters);

module.exports = router
