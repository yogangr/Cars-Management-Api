const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];

  if (token != null && token != undefined) {
    token = token.split(" ")[1];

    jwt.verify(token, "access", async (err, user) => {
      if (user) {
        req.user = user;
        next();
      } else if (err.message === "jwt expired") {
        return res.status(401).json({
          message: "Access token expired",
        });
      } else {
        console.log(err);
        return res.status(401).json({
          message: "User not authenticated",
        });
      }
    });
  } else {
    return res.status(401).json({
      message: "Anda tidak dapat mengakses!",
    });
  }
};
