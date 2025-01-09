"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Back, MoreIcon, BookIcon, ArrowIcon, MainIcon } from "@/app/components/lib";
import useCustomQuery from "@/app/hooks/useQuery";

export default function Lessons() {
  const [userId, setUserId] = useState(null);

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Use `useCustomQuery` to fetch courses based on userId
  const { data: courses, isLoading, isError } = useCustomQuery("myCourses", {
    userId,
  });
  console.log("courses", courses)

  if (isLoading) {
    return <p className="text-center">Курстар жүктелуде...</p>;
  }

  if (isError) {
    return <p className="text-center text-red-500">Курстарды жүктеу кезінде қате пайда болды.</p>;
  }

  if (!courses?.course) {
    return <p className="text-center">Курстар табылмады.</p>;
  }

  return (
    <div className="">
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
          <div className="mx-auto">
            <Link href="/">
              <Back />
            </Link>
          </div>

          <h1 className="font-bold text-xl text-black">Менің курстарым</h1>
          <MoreIcon />
        </div>
        <div className="flex phone:flex-col max-w-[358px] mx-auto mt-3 mb-3 pt-3 pb-4 max-h-[101px] bg-[#F4F5F9] rounded-xl">
          <div className="mx-2 mb-2">
            <MainIcon />
          </div>
          <div className="ml-2 pr-2">
            <p className="font-bold flex phone:flex phone:flex-col break-words line-clamp-1">
              {courses.course[0]?.name || "Cіздің курсыңыз"}
              </p>
              <span className="font-normal leading-1  break-words line-clamp-2">
                {courses.course[0]?.description || "Курстың сипаттамасы"}
                </span>
              </div>



        </div>
        <h2 className="font-bold text-base ml-3">Менің курстарым</h2>
        <div className="ml-3">
  {/* Dynamically render courses */}
  {courses.course.map((courseData, index) => (
    <Link
      key={courseData.id}
      href={`/courses/${courseData.id}`}
      className={`flex items-center justify-between py-4 px-4 ${
        index % 3 === 0 ? "bg-[#F5FAF5]" : index % 3 === 1 ? "bg-[#FFF6F4]" : "bg-[#F2F8FC]"
      } max-w-[358px] mt-3 rounded-xl`}
    >
      <div className="flex items-center">
        <BookIcon />
        <span className="font-bold ml-3 break-all truncate">
          {courseData?.name || "Аты жоқ курс"}
        </span>
      </div>
      <ArrowIcon />
    </Link>
  ))}
</div>
      </div>
    </div>
  );
}
