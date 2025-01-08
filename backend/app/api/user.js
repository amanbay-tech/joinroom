const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const {getUserId}  = require("./bot");

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId ? req.body.userId.toString() : null;
    const username = req.body.username || 'empty'; // If username is null or undefined, set it to an empty string
    if (!userId && !username) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }
    if (username && !userId) {
      // If only username is provided, check if the username exists
      const user = await prisma.user.findFirst({ where: { username } });

      if (user) {
        return res.status(200).json({ userId: user.userId });
      } else {
        userId = getUserId(username)
        if (!userId) {
          // If userId could not be fetched, return an error response
          return res
            .status(404)
            .json({ error: "Not Found", message: "Username not registered or invalid" });
        }
      }
    }
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      const newuser = await prisma.user.create({
        data: {
          userId,
          username,
        },
      });

      return res.status(200).json({ newuser });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/edit", async (req, res) => {
  try {
    res.status(200).json({
      message: "User EDIT",
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
      message: "User DELETE",
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
