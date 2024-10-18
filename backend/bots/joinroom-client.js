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



module.exports = {
createUser
};
