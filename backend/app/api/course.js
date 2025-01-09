const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const logger = require("../logger");
const {sendMessage}  = require("./bot");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userId = req.body.userId.toString();

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
router.post("/get", async (req, res) => {
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

    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      include: {
        lesson: true, // Include related lessons
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
    const userId = req.body.userId.toString();
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
    const userId = req.body.userId.toString();
    const courseId = parseInt(req.body.courseId, 10);
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
    const userId = req.body.userId.toString();

    if (!userId) {
      return res
        .status(400)
        .json({ error: "Bad request", message: "UserId is required" });
    }

    // Find the user based on userId
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res
        .status(401)
        .json({ error: "User error", message: "User not found" });
    }

    // Fetch all pending orders across all courses of the user, including course and user info
    const pendingCourses = await prisma.myCourse.findMany({
      where: {
        courseOwnerId: user.id,
        isActive: true,
        status: "PENDING",
      },
      include: {
        course: true,  // Include course details
        user: true     // Include user details who pended the course (if required)
      }
    });

    if (pendingCourses.length === 0) {
      return res.status(200).json({ message: "No pending orders for this user." });
    }

    // Map and return the relevant data, including course and user details
    const formattedCourses = pendingCourses.map(course => ({
      myCourseId: course.id,
      courseId: course.courseId,
      courseName: course.course.name,
      clientId: course.user.id,
      userName: (course.user && (course.user.username && course.user.username !== 'empty')) 
      ? course.user.username 
      : course.user.userId,  
      status: course.status
    }));

    res.status(200).json({ pendingCourses: formattedCourses } || []);
  } catch (error) {
    console.error('Error fetching course details:', error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.post("/order/manage", async (req, res) => {
  try {
    const userId = req.body.userId.toString();
    const courseId = parseInt(req.body.courseId, 10);
    const clientId = req.body.clientId;  // Treat clientId as string
    const { status } = req.body;
    console.log(req.body);

    // Input validation
    if (!userId || !courseId || !clientId || !status) {
      return res.status(400).json({ error: "Bad request", message: "All fields (userId, courseId, clientId, status) are required" });
    }

    // Ensure status is either "ALLOWED" or "REJECTED"
    if (status !== "ALLOWED" && status !== "REJECTED") {
      return res.status(400).json({ error: "Bad request", message: "Invalid status. Allowed values are 'ALLOWED' or 'REJECTED'" });
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { userId } });
    if (!user) {
      return res.status(401).json({ error: "User error", message: "User not found" });
    }

    // Check if the course exists with the given parameters
    const mycourse = await prisma.myCourse.findFirst({
      where: {
        courseOwnerId: user.id,
        userId: clientId,
        courseId,
        isActive: true,
      },
      include: {
        course: true, // Include course data in the response
        user: true    // Include user data in the response
      }
    });

    if (!mycourse) {
      return res.status(404).json({ message: "Pending course not found" });
    }

    // Determine the userName (either the username or the userId if empty)
    const userName = (mycourse.user && mycourse.user.username && mycourse.user.username !== 'empty')
      ? mycourse.user.username
      : mycourse.user.userId;

    // Update the course status
    const updatedCourse = await prisma.myCourse.update({
      where: { id: mycourse.id },
      data: { status },
    });
    const client = await prisma.user.findUnique({ where: { id : clientId } });
    if (!user) {
      return res.status(401).json({ error: "User error", message: "User not found" });
    }
    const statusMessage = status === "ALLOWED" 
      ? `Сұранысыңыз қабылданды. Сіз "${mycourse.course.name}" курсына тіркелдіңіз! ✅`
      : `Сіздің "${mycourse.course.name}" курсыңа жазылу өтінішіңіз қабылданбады ❌`;

    await sendMessage(client.userId, statusMessage);  // Send message to the client via Telegram bot

    // Return the updated course with courseName and userName
    res.status(200).json({
      course: updatedCourse,
      courseName: mycourse.course.name,
      userName: userName,
    });
  } catch (error) {
    console.error("Error updating course status:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
