"use server";

import { NextResponse } from "next/server";

export default async function ServerRequest({ route, path, body }) {
  try {
    const server = process.env.NEXT_PUBLIC_API_URL;
    const jwt = process.env.SERVER_JWT;

    let bodydata = JSON.stringify({
      jwt,
      ...body,
    });

    try {
      const res = await fetch(`${server}/${route}/v1/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodydata,
      });

      return await res.json();
    } catch (error) {
      return NextResponse.json({ error: "catch" });
    }
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: "catch" });
  }
}
