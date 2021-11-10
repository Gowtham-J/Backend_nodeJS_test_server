const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

router.get("/", async (req, res) => {
  try {
    const response = await db.query(
      "SELECT USERNAME, USER_CONTACT FROM user_details ORDER BY CREATED_DATE_TIME"
    );
    console.log(response);
    res.send(response);
  } catch (error) {
    res.send({ message: "error", status: 404 });
  }
});

module.exports = router;
