const carRepository = require("../repository/carsRepository");

module.exports = {
  async createCar(data, user) {
    try {
      const car = await carRepository.create({
        carModel: data.carModel,
        carType: data.carType,
        available: true,
        createdBy: user.userId,
        updatedBy: user.userId,
      });
      return car;
    } catch (err) {
      throw new Error("Failed to create car");
    }
  },

  async getCars() {
    try {
      return (cars = await carRepository.findAll());
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async updateCar(id, data, user) {
    try {
      let carId = await carRepository.find(id);
      if (carId === null) {
        throw new Error("Car not found");
      } else {
        return (car = await carRepository.update(id, {
          carModel: data.carModel,
          carType: data.carType,
          available: true,
          updatedBy: user.userId,
        }));
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },

  async deleteCar(id, user) {
    try {
      let carId = await carRepository.find(id);
      if (carId === null) {
        throw new Error("Car not found");
      } else {
        await carRepository.update(id, {
          deletedBy: user.userId,
          available: false,
        });
      }
    } catch (err) {
      throw new Error(err.message);
    }
  },
  async getDeleteCars() {
    try {
      return (cars = await carRepository.findDeleted());
    } catch (err) {
      throw new Error(err.message);
    }
  },
};
