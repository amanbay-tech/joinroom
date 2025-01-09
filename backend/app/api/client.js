const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("body", req.body)
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
        id: courseId,
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
    const course = await prisma.course.findFirst({
      where: {
        id: mycourse.courseId,
      },
      include: {
        lesson: true,
      },
    });
    console.log(course)
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});
router.post("/lessons", async (req, res) => {
  try {
    const userId = req.body.userId.toString();
    const courseId = parseInt(req.body.courseId, 10);
    if (!userId || !courseId) {
      return res.status(400).json({ error: "Bad request", message: "UserId and courseId are required" });
    }

    // Verify the user
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res.status(401).json({ error: "User error", message: "User not found" });
    }

    // Verify the user has access to the course
    const mycourse = await prisma.myCourse.findFirst({
      where: {
        id: courseId,
        userId: user.id,
        isActive: true,
        status: "ALLOWED",
      },
    });

    if (!mycourse) {
      return res.status(403).json({ error: "Access denied", message: "The course is not allowed" });
    }

    // Fetch the course and its lessons
    const course = await prisma.course.findFirst({
      where: { id: mycourse.courseId },
      include: { lesson: true }, // Including related lessons
    });

    if (!course) {
      return res.status(404).json({ error: "Not found", message: "Course not found" });
    }

    // Return the lessons
    res.status(200).json({ lesson: course.lesson });
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
    const lessonId = parseInt(req.body.lessonId, 10); // Corrected this line
    console.log("req.body", req.body);

    if (!userId) {
      return res.status(400).json({ error: "Bad request", message: "UserId is required" });
    }

    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res.status(401).json({ error: "User error", message: "User not found" });
    }

    // Verify that the user is allowed access to the course
    const myCourse = await prisma.myCourse.findFirst({
      where: {
        id: courseId,
        userId: user.id,
        isActive: true,
        status: "ALLOWED",
      },
    });

    if (!myCourse) {
      return res.status(403).json({ error: "Access denied", message: "The course is not allowed" });
    }

    // Fetch the lesson related to the course
    const lesson = await prisma.lesson.findFirst({
      where: {
        id: lessonId,
        courseId: myCourse.courseId,  // Ensure that the lesson belongs to the specified course
      },
    });

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found", message: "The requested lesson was not found for the course" });
    }

    res.status(200).json({ lesson });
    console.log("lesson", lesson);
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
        myCourse: {
          none: {
            userId: user.id,
            status: { in: ["ALLOWED", "PENDING"] }, // Exclude these statuses
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
    console.log("body", req.body);

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

    // Check if the course already exists in myCourse
    const existingCourse = await prisma.myCourse.findFirst({
      where: {
        userId: user.id,
        courseId: courseId,
      },
    });

    if (existingCourse) {
      // Update the status to "PENDING" if it exists
      const updatedCourse = await prisma.myCourse.update({
        where: { id: existingCourse.id },
        data: { status: "PENDING" },
      });
      return res.status(200).json({
        message: "Course status updated to PENDING",
        updatedCourse,
      });
    }

    // Create a new entry if not already in myCourse
    const mycourse = await prisma.myCourse.create({
      data: {
        courseId,
        userId: user.id,
        status: "PENDING",
        courseOwnerId: course.ownerId,
      },
    });

    res.status(200).json({ message: "Course successfully ordered", mycourse });
  } catch (error) {
    console.error("Error occurred:", error.message);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
