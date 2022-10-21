const Router = require("express");
const authRouters = new Router();
const authController = require("../controllers/auth.controller");
const {check} = require("express-validator");

authRouters.post("/registration", [
  check("name", "This field should not be empty").notEmpty(),
  check("email", "This field should not be empty").notEmpty(),
  check("email", "Use correct email, please").isEmail(),
  check("password", "It should include from 8 to 10 symbols").isLength({min: 8, max: 20})
], authController.registration);
authRouters.post("/login", authController.login);
authRouters.put("/updateuser", authController.updateUser);
authRouters.get("/checkisauth", authController.checkIsAuth);

module.exports = authRouters
