require("dotenv").config();

module.exports = {
  secret: process.env.AUTH_JWT_SECRET
};
