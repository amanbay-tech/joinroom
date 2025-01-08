"use server";
import ServerRequest from "@/app/actions/api/ServerRequest";

export async function getData(route, path) {
  try {
    const req = await ServerRequest({
      route,
      path,
    });

    if (req.error) {
      return { error: req.message };
    }

    return req;
  } catch (error) {
    return { error: error.message };
  }
}

export async function createData(route, path, body) {
  try {
    const req = await ServerRequest({
      route,
      path,
      body,
    });

    if (req.error) {
      console.log(req);
      return { error: req.message };
    }
    console.log(req);
    return req;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
export async function updateData(route, path, id, body) {
  try {
    const req = await ServerRequest({
      route,
      path,
      body: {
        ...body,
        id: id,
      },
    });

    if (req.error) {
      console.log(req);
      return { error: req.message };
    }

    console.log(req);
    return req;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
export async function updateStatusData(route, path, body) {
  try {
    const req = await ServerRequest({
      route,
      path,
      body,
    });

    if (req.error) {
      console.log(req);
      return { error: req.message };
    }

    console.log(req);
    return req;
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
}
