import {
    createData,
    getData,
    updateData,
    updateStatusData,
  } from "@/app/actions/data";
  
  const Queries = {
    user: async (username) => await createData("api", "user", username),
    allCourses: async (userId) => await createData("api", "client/course/all", userId),
    myCourses: async (userId) => await createData("api", "client/course/list", userId),
    myCourse: async (courseData) => await createData("api", "client/course", courseData),
    user: async (username) => await createData("api", "user", username),
    couseLesson: async (courseData) => await createData("api", "client/course/lesson", courseData),
    couseOrder: async (courseData) => await createData("api", "client/course/order", courseData),
  };
  
  export default Queries;