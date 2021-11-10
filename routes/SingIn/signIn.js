// Importing modules
const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../../dbConnection");
const router = express.Router();
const saltRound = 10;

// Post Requstes for sign in
router.post("/", async (req, res) => {
  try {
    const { userName, contact, password } = req.body;
    const bcryptPassword = await bcrypt.hash(password, saltRound);
    //  condition for existing user
    const userCheck = await db.query(
      "SELECT USERNAME FROM user_details WHERE USERNAME = ?",
      [userName]
    );
    const userContactCheck = await db.query(
      "SELECT USER_CONTACT FROM user_details WHERE USER_CONTACT = ?",
      [contact]
    );

    console.log(userContactCheck);
    if (userCheck.length !== 0 || userContactCheck.length !== 0)
      res.send({ message: "User alredy exists", status: 400 });
    else {
      const response = await db.query(
        "INSERT INTO user_details(USERNAME, USER_CONTACT, PASSWORD) VALUES (?,?,?)",
        [userName, contact, bcryptPassword]
      );
      res.send({ message: "User account succcessfully created", status: 200 });
    }
  } catch (error) {
    res.send({ error: "error", status: 400 });
  }
});

module.exports = router;
