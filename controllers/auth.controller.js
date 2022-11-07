const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { secret } = require("../configs/secret.config");

const generateAccessToken = (id) => {
  const payload = {
    id
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Ошибка валидации во время регистрации", errors });
      };

      const { firstName, email, password } = req.body;
      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" });
      };

      const hashPassword = bcrypt.hashSync(password, 1);
      const user = new User({ firstName, email, password: hashPassword, isActive: true });
      await user.save();

      const token = generateAccessToken(user._id);
      return res.json({ token });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка регистрации" });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      };
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "Неверный логин или пароль" });
      };
      let userType;
      if (validPassword && user.role === "ADMIN") {
        userType = "ADMIN";
      };

      const token = generateAccessToken(user._id, userType);
      return res.json({ token, userType });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Неверный логин или пароль", e });
    }
  }

  async getUserData(req, res) {
    try {
      const token = req.headers.authorization;
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id
      const user = await User.findOne({ _id: userId });
      return res.status(200).json({ user });
    } catch (e) {
      console.log(e);
    }
  }

  async checkIsAuth(req, res) {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" });
      }
      const decoded = jwt.verify(token, secret);
      const userId = decoded.id
      const user = await User.findOne({ _id: userId });

      if (decoded && user.role === "ADMIN") {
        return res.json({ isAuth: true, role: "ADMIN" });
      } else if (decoded) {
        return res.json({ isAuth: true });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка запроса или истек срок действия токена", e });
    }
  }

  async updateUser(req, res) {
    try {
      const { email, firstName, oldPassword, password, lastName } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "По Вашему запросу не найдено совпадений" });
      }

      if (oldPassword) {
        const validPassword = bcrypt.compareSync(oldPassword, user.password);
        const hashPassword = bcrypt.hashSync(password, 1);
        if (!validPassword) {
          return res.status(400).json({ message: "Неверный пароль" });
        } else {
          await User.findOneAndUpdate(
          { email },
          {
            $set: {
              password: hashPassword,
              firstName: firstName,
              lastName: lastName
            }
          }
        );
        return res.status(200).json({ message: "Информация успешно обновлена" });
        }
      } else {
        await User.findOneAndUpdate(
        { email },
        {
          $set: {
            firstName: firstName,
            lastName: lastName
          }
        }
      )
      return res.status(200).json({ message: "Информация успешно обновлена" });
      }
    } catch (e) {
      res.status(400).json({ message: "Что-то не так... Возможно, не все поля заполнены или введён неверный пароль", e });
    }
  }
};

module.exports = new authController()
