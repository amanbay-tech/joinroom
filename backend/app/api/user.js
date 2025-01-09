const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();
const {getUserId, sendMessage}  = require("./bot");
const {sendInteractiveMessage}  = require("./bot");

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
const pendingApprovals = {}; // In-memory storage for pending approvals (use Redis or DB in production)

router.post("/start", async (req, res) => {
  try {
    const userId = req.body.userId ? req.body.userId.toString() : null;
    const username = req.body.username || "empty";

    if (!userId && !username) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId or username is required" });
    }

    let user;
    if (username && !userId) {
      user = await prisma.user.findFirst({ where: { username } });
      if (!user) {
        return res
          .status(404)
          .json({ error: "Not Found", message: "Username not registered or invalid" });
      }
    } else {
      user = await prisma.user.findUnique({ where: { userId } });
      if (!user) {
        user = await prisma.user.create({ data: { userId, username } });
      }
    }

    // Store the pending approval
    pendingApprovals[user.userId] = { approved: false };

    // Send the interactive message
    await sendInteractiveMessage(
      user.userId,
      "Сіздің аккаунтыңызға кіру жүзеге асырылуда, бұл сіз бе?",
      [
        { text: "Иә, менмін ✅", callback_data: `approve_${user.userId}` },
        { text: "Жоқ, мен емес ❌", callback_data: `reject_${user.userId}` },
      ]
    );

    // Polling for approval
    const interval = setInterval(() => {
      if (pendingApprovals[user.userId]?.approved) {
        clearInterval(interval);
        delete pendingApprovals[user.userId]; // Remove the entry after approval
        res.status(200).json({ message: "User approved the session", user });
      }
    }, 1000);
    // Timeout to prevent indefinite waiting
    setTimeout(() => {
      clearInterval(interval);
      if (pendingApprovals[user.userId]) {
        delete pendingApprovals[user.userId];
        res.status(408).json({
          error: "Request Timeout",
          message: "User did not approve in time",
        });
      }
    }, 60000); // 60 seconds timeout
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});
router.post("/approve", async (req, res) => {
  const { isApproved, userId } = req.body;

  if (!userId || isApproved === undefined) {
    return res.status(400).json({
      error: "Bad Request",
      message: "userId and isApproved fields are required.",
    });
  }

  if (pendingApprovals[userId]) {
    pendingApprovals[userId].approved = isApproved;

    if (isApproved) {
      res.status(200).send("Approval status updated to approved.");
    } else {
      delete pendingApprovals[userId]; // Clean up on rejection
      res.status(200).send("Approval status updated to rejected.");
    }
  } else {
    res.status(404).json({
      error: "Not Found",
      message: "No pending approval found for this userId.",
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
