"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useCustomQuery from "@/app/hooks/useQuery";
import { Back, MoreIcon,BookIcon, ArrowIcon } from "@/app/components/lib";


export default function CourseDetails() {
  const { id } = useParams(); // Get the course ID from the URL
  const courseId = id; // Set courseId from route params
  const [userId, setUserId] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Fetch course details using courseId and userId
  const { data, isLoading, isError } = useCustomQuery("myCourse", {
    courseId,
    userId,
  });

  useEffect(() => {
    if (data) {
      setCourseData(data);
    }
  }, [data]);

  console.log("courses", courseData)

  if (!userId) {
    return <p className="text-center text-red-500">Пайдаланушы ID табылмады.</p>;
  }

  if (isLoading) {
    return <p className="text-center">Курс жүктелуде...</p>;
  }

  // Display "Not Found" if course doesn't exist
  if (!courseData || !courseData.course) {
    return <p className="text-center text-gray-500">Курс табылмады.</p>;
  }

  return (
    <div className="">
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex justify-between  pt-7 sm:flex phone:flex-col mx-auto">
          <div className="ml-2">
          <Link href={`/courses`}>
              <Back />
            </Link>
          </div>
          <h1 className="font-bold pt-1 text-xl text-black">{courseData.course.name || "Курс"}</h1>
          <div className="mr-2">
          <MoreIcon />
          </div>
        </div>
        <div className="mt-6 px-4">
          <p className="font-normal text-lg">{courseData.course.description || "Сипаттама жоқ"}</p>

          <h2 className="mt-6 font-bold text-lg">Сабақтар:</h2>
          {courseData.course?.lesson?.length > 0 ? (
  courseData.course.lesson.map((lessonData, index) => (
    <Link
      key={lessonData.id}
      href={`/courses/${courseId}/${lessonData.id}`}
      className={`flex items-center justify-between py-4 px-4 ${
        index % 3 === 0 ? "bg-[#F5FAF5]" : index % 3 === 1 ? "bg-[#FFF6F4]" : "bg-[#F2F8FC]"
      } max-w-[358px] mt-3 rounded-xl`}
    >
      <div className="flex items-center">
        <BookIcon />
        <span className="font-bold ml-3 break-all truncate">
          {lessonData.name || "Аты жоқ сабақ"}
        </span>
      </div>
      <ArrowIcon />
    </Link>
  ))
) : (
  <p className="text-gray-600 mt-2">Бұл курста сабақтар жоқ.</p>
)}

        </div>
      </div>
    </div>
  );
}
