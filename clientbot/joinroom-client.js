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

async function getMyCourses(userId) {
  try {
    const response = await axios.post(
      `${url}/client/course/list`,
      { userId: userId },
      {
        params: {
          jwt: jwt,
        },
      }
    );
    return response.data.course; // Adjust if the array is nested deeper
  } catch (error) {
    console.error('Error getting user courses', error);
    throw new Error('Failed to get user courses.');
  }
}
// Function to subscribe a user to a course via the backend API
async function subscribeCourse(userId, courseId) {
  try {
    const response = await axios.post(
      `${url}/client/course/order`, // Adjusted the URL to match the subscription endpoint
      {
        userId: userId,
        courseId: courseId,
      },
      {
        params: {
          jwt: jwt, // Include the JWT token for authentication
        },
      }
    );

    return response.data; // Return the response data directly for further use
  } catch (error) {
    console.error('Error subscribing user to course:', error);
    throw new Error('Failed to subscribe user to the course.');
  }
}
async function getCourseLessons(userId,courseId) {
  try {
    const response = await axios.post(
      `${url}/expert/lesson`,
      { 
        userId: userId,
        courseId:courseId
       },
      {
        params: {
          jwt: jwt,
        },
      }
    );
    return response.data.lesson; // Adjust if the array is nested deeper
  } catch (error) {
    console.error('Error getting courses for expert user:', error);
    throw new Error('Failed to get expert courses.');
  }
}
async function getLesson(userId, courseId, lessonId) {
  try {
    const response = await axios.post(`${url}/expert/lesson/get`, {
        userId: userId,
        courseId: courseId,
        lessonId: lessonId,
    },
    {
        params: {
          jwt: jwt, 
        },
      }
    );
    console.log('Fetching lesson with:', { userId, courseId, lessonId });

    return response.data.lesson; 
  } catch (error) {
    console.error('Error getting lesson info:', error);
    throw new Error('Failed to get lesson.');
  }
}
module.exports = {
createUser,
getExpertCourses,
getCourse,
getAllCourses,
getMyCourses,
subscribeCourse,
getCourseLessons,
getLesson,
};
