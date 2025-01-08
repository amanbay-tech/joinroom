import {
    createData,
    getData,
    updateData,
    updateStatusData,
  } from "@/app/actions/data";
  
  const Queries = {
    user: async (username) => await createData("api", "user", username),
  };
  
  export default Queries;