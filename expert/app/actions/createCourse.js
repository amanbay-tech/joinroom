"use server";

import ServerRequest from "@/actions/api/ServerRequest";
import { revalidatePath } from "next/cache";

export async function createCourse(data) {
  try {
    const req = await ServerRequest({
      route: "api",
      path: "expert/course/create",
      body: data,
    });

    if (req.error) {
      return { error: req.message };
    }

    //revalidatePath("course/newcourse");
    return { req };
  } catch (e) {
    return { error: "error" };
  }
}
