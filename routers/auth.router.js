const Router = require("express");
const authRouters = new Router();
const authController = require("../controllers/auth.controller");
const {check} = require("express-validator");
const adminMiddleware = require("../middleware/admin.middleware");

authRouters.post("/registration", [
  check("name", "This field should not be empty").notEmpty(),
  check("email", "This field should not be empty").notEmpty(),
  check("email", "Use correct email, please").isEmail(),
  check("password", "It should include from 8 to 10 symbols").isLength({min: 8, max: 20})
], authController.registration);
authRouters.post("/login", authController.login);
authRouters.get("/users", adminMiddleware, authController.getUsers);
authRouters.delete("/deleteuser", adminMiddleware, authController.deleteUser);
authRouters.put("/updateuser", authController.updateUser);

module.exports = authRouters
