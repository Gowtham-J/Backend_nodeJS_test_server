const jwt = require("jsonwebtoken");
const JWT_KEY = "A5CUPVTOogd3DHON20S6HxTZTm0YtlBN";

// require("dotenv").config();
module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      jwt.verify(token, JWT_KEY, (err, result) => {
        if (err) {
          res.json({
            err,
            message: "invalid token",
            status: "error",
            statusCode: 401,
          });
        } else {
          req.result = result;
          next();
        }
      });
    } else {
      res.json({
        message: "access denied unauthorised user",
        statusCode: 401,
        status: "error",
      });
    }
  },
};
