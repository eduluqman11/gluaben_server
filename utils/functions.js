var jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization != undefined) {
    const token = authorization.split(" ")[1];
    if (!token) {
      return res
        .status(200)
        .json({ success: false, message: "Error! Token was not provided." });
    }
    try {
      const decodedToken = jwt.verify(token, process.env.SECRETKEY);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid signature" });
    }
  } else {
    res.status(401).json({ message: "unauthorize" });
  }
};

module.exports = verifyToken;
