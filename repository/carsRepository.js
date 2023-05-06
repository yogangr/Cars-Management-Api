const { Car } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  create(createArgs) {
    return Car.create(createArgs);
  },
  update(id, updateArgs) {
    return Car.update(updateArgs, {
      where: { id },
    });
  },
  delete(id) {
    return Car.destroy(id);
  },
  find(id) {
    return Car.findByPk(id);
  },
  findAll() {
    return Car.findAll({
      attributes: { exclude: ["createdAt", "updatedAt", "deletedBy"] },
      where: {
        available: true,
      },
    });
  },
  findDeleted() {
    return Car.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      where: {
        available: false,
      },
    });
  },
  filter(filterArgs) {
    return Car.findAll({
      where: {
        [Op.and]: [
          {
            capacity: {
              [Op.gte]: filterArgs.capacity,
            },
          },
          {
            avaliableAt: { [Op.gte]: filterArgs.avaliableAt },
          },
        ],
      },
    });
  },
};
