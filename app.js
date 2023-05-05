const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
const {
  register,
  login,
  createAdmin,
  getUsers,
} = require("./controller/userController");
const { verifyToken } = require("./middleware/verifyToken");
const prefix = "/v1/api/";

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// User API
app.post(prefix + "register", register);
app.post(prefix + "login", login);
app.post(prefix + "createadmin", verifyToken, createAdmin);
app.get(prefix + "users", verifyToken, getUsers);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
