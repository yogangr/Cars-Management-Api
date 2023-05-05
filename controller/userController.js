const userService = require("../service/userService");
const { User } = require("../models");

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "email", "role"],
      });
      res.status(200).json({
        data: users,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async register(req, res) {
    try {
      const data = await userService.register(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json(error.message);
      console.log(error);
    }
  },

  async login(req, res) {
    try {
      const data = await userService.login(req.body);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false, message: "Login Failed" });
    }
  },
  async createAdmin(req, res) {
    try {
      const data = await userService.createAdmin(req.body);
      res.status(201).json(data);
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
};
