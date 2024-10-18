const express = require("express");
const router = express.Router();

const { main } = require("../app/controllers/");

router.use("/main", main);

module.exports = router;
