import {
    createData,
    getData,
    updateData,
    updateStatusData,
  } from "@/app/actions/data";
  
  const Queries = {
    user: async (username) => await createData("api", "user/start", username),
    allCourses: async (userId) => await createData("api", "client/course/all", userId),
    myCourses: async (userId) => await createData("api", "expert/course", userId),
    myCourse: async (courseData) => await createData("api", "expert/course/get", courseData),
    couseLessons: async (courseData) => await createData("api", "expert/lesson", courseData),
    couseLesson: async (courseData) => await createData("api", "expert/lesson/get", courseData),
    addLesson: async (courseData) => await createData("api", "expert/lesson/create", courseData),
    createCourse: async (courseData) => await createData("api", "expert/course/create", courseData),
    orders: async (userId) => await createData("api", "expert/course/order", userId),
    manageOrder: async (orderData) => await createData("api", "expert/course/order/manage", orderData),
  };
  
  export default Queries;