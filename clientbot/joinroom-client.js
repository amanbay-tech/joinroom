require('dotenv').config();
const axios = require('axios');
const url =process.env.BACKEND_URL;
const jwt=process.env.API_JWT;
// Function to make a GET request
async function createUser(userId) {
  try {
    console.log("jwt:" + jwt);
    const response = await axios.post(`${url}/user`, {
        userId: userId
    },
    {
        params: {
          jwt: jwt, 
        },
      }
    );

    return response.data; // Return the response data directly
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create a user.');
  }
}
async function getExpertCourses(userId) {
  try {
    const response = await axios.post(
      `${url}/expert/course`,
      { userId: userId },
      {
        params: {
          jwt: jwt,
        },
      }
    );
    return response.data.course; // Adjust if the array is nested deeper
  } catch (error) {
    console.error('Error getting courses for expert user:', error);
    throw new Error('Failed to get expert courses.');
  }
}

async function createCourse(userId, courseName, courseDescription) {
  try {
    const response = await axios.post(`${url}/expert/course/create`, {
        userId: userId,
        name: courseName,
        description: courseDescription
    },
    {
        params: {
          jwt: jwt, 
        },
      }
    );
    return response.data; 
  } catch (error) {
    console.error('Error creating courses user:', error);
    throw new Error('Failed to create courses.');
  }
}
async function getCourse(userId, courseId) {
  try {
    const response = await axios.post(`${url}/expert/course/get`, {
        userId: userId,
        courseId: courseId,
    },
    {
        params: {
          jwt: jwt, 
        },
      }
    );
    return response.data.course; 
  } catch (error) {
    console.error('Error creating courses user:', error);
    throw new Error('Failed to create courses.');
  }
}
async function addLesson(userId, courseId, lessonName, lessonDescription, lessonUrl) {
  try {
    // Step 1: Fetch existing lessons for the course to determine the last order number
    const lessonsResponse = await axios.post(`${url}/expert/lesson/`, {
      params: {
        courseId: courseId,
        jwt: jwt, 
      },
    });

    // Step 2: Get the lessons data and determine the last order number
    const lessons = lessonsResponse.data || [];
    const lastOrderNumber = lessons.length > 0 
      ? Math.max(...lessons.map(lesson => lesson.orderNumber)) 
      : 0;

    // Step 3: Set the new order number as lastOrderNumber + 1
    const newOrderNumber = lastOrderNumber + 1;

    // Step 4: Create the new lesson with the determined order number
    const response = await axios.post(`${url}/expert/lesson/create`, {
      userId:userId,
      courseId:courseId,
      name: lessonName,
      description: lessonDescription,
      url: lessonUrl,
      orderNumber: newOrderNumber,
    }, {
      params: {
        jwt: jwt, 
      },
    });

    return response.data; 
  } catch (error) {
    console.error('Error creating lesson:', error);
    throw new Error('Failed to create lesson.');
  }
}

async function getAllCourses(userId) {
  try {
    const response = await axios.post(
      `${url}/client/course/all`,
      { userId: userId },
      {
        params: {
          jwt: jwt,
        },
      }
    );
    return response.data.course; // Adjust if the array is nested deeper
  } catch (error) {
    console.error('Error getting courses for expert user:', error);
    throw new Error('Failed to get expert courses.');
  }
}


module.exports = {
createUser,
getExpertCourses,
createCourse,
getCourse,
addLesson,
getAllCourses
};
