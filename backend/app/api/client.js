const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId.toString();
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
    const userId = req.body.userId.toString();
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
    const userId = req.body.userId.toString();

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
      include: {
        course: true,  // Include related course data
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
    const userId = req.body.userId.toString();

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

    // Find all courses that the user has not subscribed to
    const courses = await prisma.course.findMany({
      where: {
        NOT: {
          myCourse: {
            some: {
              userId: user.id,  // Filter out courses already subscribed to by this user
            },
          },
        },
      },
    });

    if (courses.length === 0) {
      return res.status(200).json({ message: "No available courses" });
    }

    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/order", async (req, res) => {
  try {
    const userId = req.body.userId.toString();
    const courseId = parseInt(req.body.courseId, 10);

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "userId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId: userId } });
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

    // Check if the course has already been ordered by the user
    const existingCourse = await prisma.myCourse.findFirst({
      where: {
        userId: user.id,
        courseId: courseId,
      },
    });

    if (existingCourse) {
      return res.status(400).json({ error: "Course already ordered by this user." });
    }

    // Allow subscription to own course (no additional check needed here)
    const mycourse = await prisma.myCourse.create({
      data: {
        courseId,
        userId: user.id,
        status: "ALLOWED",
        courseOwnerId: course.ownerId,
      },
    });

    res.status(200).json({ mycourse });
  } catch (error) {
    console.error('Error occurred:', error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
