const Router = require("express");
const router = new Router();
const authRouters = require("./auth.router");
const movieRouters = require("./movie.router");
const cinemaRouters = require("./cinema.router");
const adminRouters = require("./admin.router");
const roomRouters = require("./room.router");
const adminMiddleware = require("../middleware/admin.middleware");

router.use("/auth", authRouters);
router.use("/movies", movieRouters);
router.use("/cinemas", cinemaRouters);
router.use("/admin", adminMiddleware, adminRouters);
router.use("/room", roomRouters);

module.exports = router
