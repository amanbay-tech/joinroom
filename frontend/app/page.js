"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Icon from "../components/icon";
import Link from "next/link";

export default function Home() {
  const [buttonWidth, setButtonWidth] = useState("auto");
  const joinRoomRef = useRef(null);

  useEffect(() => {
    // Adjust the width of the button to match the width of the "Join room" text
    if (joinRoomRef.current) {
      setButtonWidth(`${joinRoomRef.current.offsetWidth + 50}px`); // Increased width
    }
  }, []);

  return (
    <div className="mx-auto h-screen bg-[url('/image-bg.png')] bg-cover bg-no-repeat w-full max-h-full bg-[0px_0px]">
      <div className="pt-32">
        <svg
          width="80"
          height="80"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <rect width="80" height="80" rx="12" fill="white" />
          <path
            d="M65 20.0001L41.7309 8.83092C40.6367 8.30571 39.3633 8.30571 38.2691 8.83092L15 20.0001V46.0001L17.8284 43.1716C18.5786 42.4215 19 41.4041 19 40.3432V21.9201L38.2691 31.1692C39.3633 31.6944 40.6367 31.6944 41.7309 31.1692L65 20.0001Z"
            fill="#2F2525"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22 38.9999V28.3599L34.9375 34.5699L40 42.5001L45.0625 34.5699L58 28.3599V71.9999H57C37.67 71.9999 22 58.3299 22 38.9999ZM35.25 42.7501C35.25 44.8211 33.5711 46.5001 31.5 46.5001C29.4289 46.5001 27.75 44.8211 27.75 42.7501C27.75 40.679 29.4289 39.0001 31.5 39.0001C33.5711 39.0001 35.25 40.679 35.25 42.7501ZM52.25 42.7501C52.25 44.8211 50.5711 46.5001 48.5 46.5001C46.4289 46.5001 44.75 44.8211 44.75 42.7501C44.75 40.679 46.4289 39.0001 48.5 39.0001C50.5711 39.0001 52.25 40.679 52.25 42.7501Z"
            fill="#2F2525"
          />
        </svg>
      </div>

      <h1 className="text-center items-center text-3xl font-bold text-white mt-10 mb-3">
        Join Room
      </h1>
      <p className="text-center px-4  text-white pb-10">
        это инновационная платформа совместной работы, созданная для
        эффективного взаимодействия команд и упрощения удаленной коммуникации.
      </p>
      <Link href="/course/create">
        <button className="px-7 text-xl mx-auto py-4 flex justify-center mt-4 bg-white border rounded-lg">
          Создать курс
        </button>
      </Link>
    </div>
  );
}
