const jwt = require("jsonwebtoken");
const { secret } = require("../configs/secret.config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({message: "User not authorized"});
    }
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(403).json({message: "User not authorized"});
  }
}
