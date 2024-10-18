const express = require("express");
const router = express.Router();

const { user, course, lesson, client } = require("../app/api/");

router.use("/user", user);

router.use("/expert/course", course);

router.use("/expert/lesson", lesson);

router.use("/client/course", client);

module.exports = router;
