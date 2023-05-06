const carServices = require("../service/carsService");
const { User } = require("../models");

module.exports = {
  async createCar(req, res) {
    const userToken = req.user;
    if (userToken.role === "member") {
      return res.status(200).json({
        success: false,
        message: "Anda Tidak Memiliki Akses!",
      });
    }
    try {
      const data = await carServices.createCar(req.body, req.user);
      res.status(201).json({
        data,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async getCars(req, res) {
    try {
      const cars = await carServices.getCars();
      res.status(200).json({
        data: cars,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async updateCar(req, res) {
    const userToken = req.user;
    if (userToken.role === "member") {
      return res.status(200).json({
        success: false,
        message: "Anda Tidak Memiliki Akses!",
      });
    }
    try {
      const car = await carServices.updateCar(
        req.params.id,
        req.body,
        req.user
      );
      res.status(200).json({
        message: "Car updated successfully",
        data: car,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },

  async deleteCar(req, res) {
    const userToken = req.user;
    if (userToken.role === "member") {
      return res.status(200).json({
        success: false,
        message: "Anda Tidak Memiliki Akses!",
      });
    }
    try {
      const car = await carServices.deleteCar(req.params.id, req.user);
      res.status(200).json({
        message: "Car deleted successfully",
        data: car,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
  async getDeleteCars(req, res) {
    const userToken = req.user;
    if (userToken.role === "member") {
      return res.status(200).json({
        success: false,
        message: "Anda Tidak Memiliki Akses!",
      });
    }
    try {
      const cars = await carServices.getDeleteCars();
      res.status(200).json({
        message: "List Deleted Cars",
        data: cars,
      });
    } catch (err) {
      res.status(404).json({
        message: err.message,
      });
    }
  },
};
