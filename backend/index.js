const express = require("express");
require("dotenv").config();
const app = express();
// const mongoose = require("./Model/User");
const cors = require("cors");
// const bodyparser = require("body-parser");
const router = require("./Router/authRouter");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", router);

app.listen(5000, () => {
  console.log(`Server is running at http://localhost:`);
});
