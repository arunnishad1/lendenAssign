const jwt = require("jsonwebtoken");
require("dotenv").config();

const userAuth = async (req, res, next) => {
  try {
    const auth = req.cookies;
    if (!auth) {
      return res.status(401).json({
        message: "unauthorized user",
      });
    }
    const token = req.cookies.token;
    if (!token) {
      res.redirect("/login");
    }
    const userData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = userData;
    next();
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
};
module.exports = userAuth;
