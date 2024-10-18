const express = require("express");
const router = express.Router();

const { jwtVerify } = require("../app/middleware/jwt");
const api = require("./api");

router.use("/api/v1", jwtVerify, api);

router.use((req, res, next) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource could not be found.",
  });
});

module.exports = router;
