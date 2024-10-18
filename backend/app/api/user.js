const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      const newuser = await prisma.user.create({
        data: {
          userId,
          username: "empty",
        },
      });

      return res.status(200).json({ newuser });
    }

    return res.status(200).json({ user });
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
