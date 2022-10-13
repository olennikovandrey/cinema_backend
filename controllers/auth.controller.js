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
        return res.status(400).json({message: "Validation error via registration", errors});
      };

      const {name, email, password} = req.body;
      const candidate = await User.findOne({email});
      if (candidate) {
        return res.status(400).json({message: "User already exists"});
      };

      const hashPassword = bcrypt.hashSync(password, 1);
      const user = new User({name, email, password: hashPassword, isActive: true});
      await user.save();

      const token = generateAccessToken(user._id);
      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Registration error"});
    }
  }

  async login(req, res) {
    try {
      const {name, email, password} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: `User ${name} not find`});
      };
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({message: "Incorrect login or password"});
      };
      let userType;
      if (validPassword && user.role === "ADMIN") {
        userType = "ADMIN";
      };

      const token = generateAccessToken(user._id, userType);
      return res.json({token});
    } catch (e) {
      console.log(e);
      res.status(400).json({message: "Login error", e});
    }
  }

  async getUsers(_, res) {
    try {
      const users = await User.find();
        return res.json(users);
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }

  async updateUser(req, res) {
    try {
      const {email, name, password, role, isActive} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: "No any matches in database to your request"});
      }
      await User.findOneAndUpdate(
        {email},
        {
          $set: {
            name: name,
            password: password,
            role: role,
            isActive: isActive
          },
          function(_, result) {
            console.log(result)
          }
        }
      );
      return res.status(200).json({message: "User updated"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }

  async deleteUser(req, res) {
    try {
      const {email} = req.body;
      const user = await User.findOne({email});
      if (!user) {
        return res.status(400).json({message: "No any matches in database to your request"});
      }
      await User.deleteOne({email});
      return res.status(200).json({message: "User deleted"});
    } catch (e) {
      res.status(400).json({message: "Something wrong", e});
    }
  }
};

module.exports = new authController()
