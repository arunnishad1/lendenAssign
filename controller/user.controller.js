const bcrypt = require("bcrypt");
const register = require("../models/register.js");
const game = require("../models/game.js");
const sendEmail = require("../utility/email.js");

require("dotenv").config();
const signup = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  try {
    if (cpassword === password) {
      const data = new register({
        name: name,
        email: email,
        password: password,
      });
      await data.save();
      return res.send(
        "Registration successful",
      );
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        code: 11000,
        message: `Email already exists`,
      });
    }
    console.log(`ERROR: `, error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(504).json({
      success: false,
      field: false,
      message: "Enter the details",
    });
  }
  const registerExists = await register.findOne({ email: email });
  if (!registerExists) {
    return res.status(400).json({
      success: false,
      userExists: false,
      message: "Enter correct credentials !",
    });
  }

  try {
    if (email && (await bcrypt.compare(password, registerExists.password))) {
      const token = await registerExists.jwtToken();
      res.cookie("token", token, {
        httpOnly: true,
        maxAge: new Date(Date.now() + 2 * 60 * 60 * 1000),
        secure: false,
        sameSite: "Lax" || "Strict",
        path: "/",
        domain: "localhost",
      });
      res.cookie("userEmail", registerExists.email);
      res.cookie("userName", registerExists.name);
      
      res.redirect("/");
    } else {
      return res.status(400).json({
        success: false,
        password: false,
        message: "Login failed, Enter the correct credentials",
      });
    }
  } catch (error) {
    console.log(`ERROR: `, error);
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("userEmail");
  res.clearCookie("userName");
  res.redirect("/");
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    {
      return res.status(400).json({
        success: false,
        message: "email not found",
      });
    }
  }
  try {
    const user = await register.findOne({ email: email });
    if (!user) {
      {
        return res.status(400).json({
          success: false,
          message: "data not found",
        });
      }
    }
    const resetToken = await user.generateToken();
    await user.save();

    const resetPasswordUrl = `${process.env.CLIENT_URI}/reset-password/${resetToken}`;
    const subject = "reset Password";

    const message = `Your reset password link is given below by clicking on the link you can reset your password
                <a href=${resetPasswordUrl} target="_blank"><button type="button" style="background-color:blue; color:white; padding:10px"> Reset Password Link</button> <a/>`;

    await sendEmail(email, subject, message);
    return res.status(200).send(`Reset Token send to ${email} successfully !`);
  } catch (error) {
    user.resetToken = undefined;
    user.tokenExpiry = undefined;
    await user.save();
    return res.status(400).json({
      success: false,
      message: "data not found",
    });
  }
};

const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.params;
  console.log(token);
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "fill the details 1",
    });
  }

  if (!confirmPassword) {
    return res.status(400).json({
      success: false,
      message: "fill the details 2",
    });
  }

  if (confirmPassword != password) {
    return res.status(400).json({
      success: false,
      message: "data not matched",
    });
  }

  try {
    const result = await register.findOne({
      resetToken: token,
      tokenExpiry: { $gt: Date.now() },
    });
    if (!result) {
      return res.status(400).json({
        success: false,
        message: "data not found !",
      });
    }

    result.password = password;
    result.resetToken = undefined;
    result.tokenExpiry = undefined;
    await result.save();
    return res.status(200).send("Your password has been reset successfully !");
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const update = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id; //req.user.id

  try {
    if (!oldPassword) {
      return res.status(400).json({
        success: false,
        message: "Fill the old password field",
      });
    }

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Fill the new password field",
      });
    }

    const result = await register.findById(userId);
    if (!result) {
      return res.status(504).json({
        success: false,
        message: "data not found",
      });
    }

    const isValidPassword = await bcrypt.compare(oldPassword, result.password);
    if (!isValidPassword) {
      return res.status(400).json({
        success: false,
        message: "old password and new password does not match",
      });
    }

    result.password = newPassword;
    await result.save();
    return res.status(200).json({
      success: true,
      message: "Your password changed successfully",
      result: result,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: `${error}`,
    });
  }
};

const getUser = async (req, res) => {
  const userId = req.user.id;
  try {
    const userData = await register.findById(userId);
    return res.status(200).json({
      userData,
    });
  } catch (e) {
    console.log(`${e}`);
  }
};

const saveGame = async (req, res) => {
  try {
    const { username, winnerType, playType } = req.body;
    const newGame = new game({
      username: username,
      winnerType: winnerType,
      playType:playType,
    });
    await newGame.save();
    return res.json(newGame);
  } catch (error) {
    return res.status(500).send({ error: "Failed to save game" });
  }
};

module.exports = {
  signup,
  login,
  logout,
  update,
  resetPassword,
  forgotPassword,
  getUser,
  saveGame,
};
