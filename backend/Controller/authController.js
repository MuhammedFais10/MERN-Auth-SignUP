const Users = require("../Model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const userModel = new Users({ name, email, password });
    userModel.password = await bcrypt.hash(password, 10); //10 is salt
    await userModel.save();
    res.status(201).json({ message: "SignUP success", success: true });
  } catch (err) {
    res.status(500).json({ message: "SignUP server failed", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Auth fail: Email does not exist",
        success: false,
      });
    }
    const ispassEqual = await bcrypt.compare(password, user.password);
    if (!ispassEqual) {
      return res.status(403).json({
        message: "Auth fail: Password is wrong",
        success: false,
      });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res
      .status(200)
      .json({
        message: "Login success",
        success: true,
        jwtToken,
        email,
        name: user.name,
      });
  } catch (err) {
    res.status(400).json({ message: "Login server failed", success: false });
  }
};
module.exports = {
  signUp,
  login,
};
