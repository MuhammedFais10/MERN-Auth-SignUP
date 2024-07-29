// const router = require("express").Router;
const express = require("express");
const router = express.Router();
const { signUp, login } = require("../Controller/authController");
const {
  signUpValidation,
  loginValidation,
} = require("../MIddlewares/AuthWalidation");

router.post("/login", loginValidation, login);

router.post("/signUp", signUpValidation, signUp);

module.exports = router;
