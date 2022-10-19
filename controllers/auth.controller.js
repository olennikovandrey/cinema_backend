const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../configs/secret.config");

const generateAccessToken = (id) => {
  const payload = {
    id
  };
  return jwt.sign(payload, secret, {expiresIn: "24h"});
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка валидации во время регистрации", errors});
      };

      const {name, email, password} = req.body;
      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({message: "Такой пользователь уже существует"});
      };

      const hashPassword = bcrypt.hashSync(password, 1);
      const user = new User({name, email, password: hashPassword, isActive: true});
      await user.save();

      const token = generateAccessToken(user._id);
      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Ошибка регистрации"});
    }
  }

  async login(req, res) {
    try {
      const {email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: "Неверный логин или пароль"});
      };
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: "Неверный логин или пароль"});
      };
      let userType;
      if (validPassword && user.role === "ADMIN") {
        userType = "ADMIN";
      };

      const token = generateAccessToken(user._id, userType);
      return res.json({token: token, userType: userType});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Неверный логин или пароль", e});
    }
  }

  async updateUser(req, res) {
    try {
      const {email, name, password, isActive} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: "По Вашему запросу не найдено совпадений"});
      }
      await User.findOneAndUpdate(
        {email},
        {
          $set: {
            name: name,
            password: password,
            isActive: isActive
          },
          function(_, result) {
            console.log(result)
          }
        }
      );
      return res.status(200).json({message: "Информация успешно обновлена"});
    } catch (e) {
      res.status(400).json({message: "Что-то не так...", e});
    }
  }
};

module.exports = new authController()
