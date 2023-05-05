const userRepository = require("../repository/userRepository");
const { checkPassword, encryptPassword } = require("../utils/auth");
const jwt = require("jsonwebtoken");

module.exports = {
  async register(data) {
    const { name, email, password } = data;
    const emailExisted = await userRepository.emailValidator(email);
    if (emailExisted) {
      return "This email address already exists";
    }
    try {
      const user = await userRepository.create({
        name: name,
        email: email,
        password: await encryptPassword(password),
        role: "member",
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  },

  async login(data) {
    const email = data.email.toLowerCase();
    const password = data.password;

    let user = await userRepository.emailValidator(email);
    user = JSON.parse(JSON.stringify(user));

    if (!user) {
      return "Email tidak terdaftar!";
    }

    const passwordCorrect = await checkPassword(user.password, password);

    if (!passwordCorrect) {
      return "Password salah!";
    }

    const role = user.role;
    const userId = user.id;

    const tokenParams = { userId, email, role };

    const token = jwt.sign(tokenParams, "access", {
      expiresIn: "1d",
    });

    return {
      userId,
      email,
      role,
      token,
    };
  },
  async createAdmin(data) {
    const { name, email, password } = data;
    const emailExisted = await userRepository.emailValidator(email);
    if (emailExisted) {
      return "This email address already exists";
    }
    try {
      const user = await userRepository.create({
        name: name,
        email: email,
        password: await encryptPassword(password),
        role: "admin",
      });
      return user;
    } catch (err) {
      throw new Error("Failed to create admin");
    }
  },
};
