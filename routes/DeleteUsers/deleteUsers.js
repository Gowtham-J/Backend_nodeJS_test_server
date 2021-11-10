const express = require("express");
const router = express.Router();
const db = require("../../dbConnection");

// Request for deleting all existing data
router.delete("/", async (req, res) => {
  try {
    const deleteAllUsers = await db.query("DELETE FROM user_details");
    console.log(deleteAllUsers);
    res.send({
      message: "All users data has been erased from the database",
      status: 200,
    });
  } catch (error) {
    res.send({ message: "error", status: 404 });
  }
});

module.exports = router;
