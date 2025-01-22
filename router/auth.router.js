const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  update,
  saveGame,
} = require("../controller/user.controller.js");
const userAuth = require("../middleware/auth.middleware.js");
const game = require("../models/game.js");
const register = require("../models/register.js");

router.get("/", (req, res) => {
  res.render("page");
});

router.get("/play", userAuth, (req, res) => {
  res.render("index");
});

router.get("/update", (req, res) => {
  res.render("update");
});

router.get("/login", (req, res) => {
  res.render("getLogin");
});

router.get("/register", (req, res) => {
  res.render("getRegister");
});

router.get("/logout", logout);

router.get("/forgot-password", (req, res) => {
  res.render("forgotPasswordLink");
});

router.get("/reset-password/:token", (req, res) => {
  res.render("resetPassword", { token: req.params.token });
});

router.get("/history", userAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userData = await register.findById({ _id: userId });
    if (userData) {
      const history = await game.find({ username: userData.name });
      if (!history) {
        return res.json({
          message: "history not found",
        });
      }
      res.render("getHistory", { history: history });
    }
  } catch (error) {
    return res.status(500).send({ error: "Failed to fetch history" });
  }
});

router.post("/register", signup);
router.post("/save-game", saveGame);
router.post("/login", login);
router.post("/update", userAuth, update);
router.post("/forgot-password", userAuth, forgotPassword);
router.post("/reset-password/:token", userAuth, resetPassword);

module.exports = router;
