const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    res.status(200).json({
      message: "Get Lesson list for course",
      brands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    res.status(200).json({
      message: "Lesson create",
      brands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/edit", async (req, res) => {
  try {
    res.status(200).json({
      message: "Lesson Edit",
      brands,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    res.status(200).json({
      message: "Lesson Edit",
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
