const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect("mongodb://localhost:27017/Authentification_SignUp")
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => {
    console.log("mongoDB connection ERROR", err);
  });

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("users", UserSchema);
