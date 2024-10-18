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
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.findMany({
      where: {
        ownerId: user.id,
      },
    });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const { name, description } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.create({
      data: {
        ownerId: user.id,
        name,
        description,
      },
    });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/edit", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.userId, 10);
    const { name, description } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.update({
      where: { id: courseId },
      data: { name, description },
    });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.userId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.update({
      where: { id: courseId },
      data: { isActive: false },
    });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/order", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.userId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const mycourse = await prisma.myCourse.findMany({
      where: {
        courseOwnerId: user.id,
        courseId,
        isActive: true,
        status: "PENDING",
      },
    });

    if (!mycourse) {
      return res.status(200).json({ message: "Course not found" });
    }

    res.status(200).json({ mycourse });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/order/manage", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.userId, 10);
    const clientId = parseInt(req.body.clientId, 10);
    const { status } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const mycourse = await prisma.myCourse.findFirst({
      where: {
        courseOwnerId: user.id,
        userId: clientId,
        courseId,
        isActive: true,
        status: "PENDING",
      },
    });

    if (!mycourse) {
      return res.status(200).json({ message: "Course not found" });
    }

    const course = await prisma.myCourse.update({
      where: { id: mycourse.id },
      data: { status },
    });

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
