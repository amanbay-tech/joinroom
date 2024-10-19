const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.courseId, 10);

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
        courseId,
        userId: user.id,
        isActive: true,
        status: "ALLOWED",
      },
    });

    if (!mycourse) {
      return res
        .status(403)
        .json({ error: "Access denied", message: "The course is not allowed" });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
        include: { lesson: true },
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

router.post("/lesson", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.courseId, 10);
    const lessonId = parseInt(req.body.courseId, 10);

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

    const course = await prisma.myCourse.findFirst({
      where: {
        courseId,
        userId: user.id,
        isActive: true,
        status: "ALLOWED",
      },
    });

    if (!course) {
      return res
        .status(403)
        .json({ error: "Access denied", message: "The course is not allowed" });
    }

    const lesson = await prisma.lesson.findUnique({
      where: {
        id: lessonId,
      },
    });

    res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/list", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "userId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.myCourse.findMany({
      where: {
        userId: user.id,
        isActive: true,
        status: "ALLOWED",
      },
    });

    if (!course) {
      return res.status(200).json({ message: "No courses" });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/all", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "userId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.findMany({
      include: {
        myCourse: {
          where: {
            userId: {
              not: user.id,
            },
          },
        },
      },
    });

    if (!course) {
      return res.status(200).json({ message: "No courses" });
    }

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
    const courseId = parseInt(req.body.courseId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "userId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return res.status(200).json({ message: "Course not found" });
    }

    const mycourse = await prisma.myCourse.create({
      data: {
        courseId,
        userId,
        status: "ALLOWED",
        courseOwnerId: course.ownerId,
      },
    });

    res.status(200).json({ mycourse });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
