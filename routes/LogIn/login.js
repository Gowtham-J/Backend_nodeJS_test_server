// Importing modules
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../dbConnection");
const router = express.Router();
const { sign } = require("jsonwebtoken");
const JWT_KEY = "A5CUPVTOogd3DHON20S6HxTZTm0YtlBN";
// Post Requstes for sign in
router.post("/", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await db.query(
      "SELECT * FROM user_details WHERE USERNAME = ?",
      [userName]
    );
    //   console.log(user[0].PASSWORD);
    if (user.length === 0)
      res.send({ message: "User does not exists", status: 400 });
    else {
      const dcrytPassword = bcrypt.compare(
        password,
        user[0].PASSWORD,
        (err, result) => {
          console.log(result);
          if (result) {
            let token = sign({ result: user[0].USERNAME }, JWT_KEY, {
              expiresIn: "24h",
            });
            delete user[0].PASSWORD;
            res.send({ userDetails: user[0], JWT: token, status: 200 });
          } else {
            res.send({ message: "Invalid user credentials.", status: 400 });
          }
        }
      );

      //   res.send(user);
    }
  } catch (error) {
    res.send({ message: "error", status: 404 });
  }
});

module.exports = router;
