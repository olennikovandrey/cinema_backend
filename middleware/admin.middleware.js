const jwt = require("jsonwebtoken");
const { secret } = require("../configs/secret.config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({message: "User not authorized"});
    }
    const decoded = jwt.verify(token, secret);
    let isAdmin = false;
    if (decoded.id === "6346a1b347a569d14b504ddf") {
      isAdmin = true;
    };
    if (!isAdmin) {
      return res.status(403).json({massage: "You have no permission"});
    };
    next();
  } catch (e) {
    return res.status(403).json({message: "User not authorized or have no permissions"});
  };
};
