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
        .json({ error: "Bad request", message: "userId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        myCourse: {
          where: {
            courseId,
            status: "ALLOWED",
          },
        },
      },
    });

    if (!course) {
      return res.status(200).json({ message: "No courses" });
    }

    const lesson = await prisma.lesson.findMany({ where: { courseId: course.id } });

    if (!lesson) {
      return res.status(200).json({ message: "No lessons" });
    }
    res.status(200).json({ lesson });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});
router.post("/get", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.courseId, 10);
    const lessonId = parseInt(req.body.lessonId, 10);

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

    const course = await prisma.course.findFirst({
      where: {
        id: courseId,
      },
      include: {
        myCourse: {
          where: {
            courseId,
            status: "ALLOWED",
          },
        },
      },
    });

    if (!course) {
      return res.status(200).json({ message: "No courses" });
    }

    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        courseId: courseId,
      },
    });

    if (!lesson) {
      return res.status(200).json({ message: "No lessons" });
    }
    res.status(200).json({ lesson });
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
    const courseId = parseInt(req.body.courseId, 10);
    const orderNumber = parseInt(req.body.orderNumber, 10);
    const { name, description, url } = req.body;

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

    const lesson = await prisma.lesson.create({
      data: {
        courseId,
        orderNumber,
        name,
        description,
        url,
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

router.post("/edit", async (req, res) => {
  try {
    const userId = parseInt(req.body.userId, 10);
    const courseId = parseInt(req.body.userId, 10);
    const { name, description, url } = req.body;

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

    const lesson = await prisma.lesson.update({
      where: { courseId },
      data: { name, description, url },
    });

    res.status(200).json({ lesson });
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
