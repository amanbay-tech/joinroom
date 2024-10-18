const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "OK",
      brands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
