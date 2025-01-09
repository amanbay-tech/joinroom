"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useCustomQuery from "@/app/hooks/useQuery";
import { Back, Forward } from "@/app/components/lib";
import YouTubePlayer from "@/app/components/videoPlayer";

export default function CourseDetails() {
  const { id, lessonId } = useParams(); // Get courseId and lessonId from the URL
  const router = useRouter();
  const courseId = id;
  const [userId, setUserId] = useState(null);
  const [lessonData, setLessonData] = useState(null);

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Fetch lesson and course data
  const { data, isLoading, isError } = useCustomQuery("couseLesson", { courseId, userId, lessonId });
  const { data: courseData, isLoading: courseLoading, isError: courseError } = useCustomQuery("myCourse", { courseId, userId });

  useEffect(() => {
    if (data) {
      setLessonData(data);
    }
  }, [data]);

  if (isLoading || courseLoading) return <p className="text-center">Сабақ жүктелуде...</p>;
  if (isError || courseError || !lessonData) return <p className="text-center text-gray-500">Сабақ табылмады.</p>;

  // Determine related lessons and next lesson
  const relatedLessons = courseData?.course?.lesson || [];
  const currentIndex = relatedLessons.findIndex((lesson) => lesson.id === Number(lessonId));
  const nextLesson = relatedLessons[currentIndex + 1] || null;

  const handleForward = () => {
    if (nextLesson) router.push(`/courses/${courseId}/${nextLesson.id}`);
    else router.push(`/courses/${courseId}`);
  };

  return (
    <div className="">
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        {/* Header */}
        <div className="flex justify-between pt-7 sm:flex phone:flex-col mx-auto">
          <div className="ml-2">
            <Link href={`/courses/${courseId}`}>
              <Back />
            </Link>
          </div>
          <h1 className="font-bold pt-1 text-xl text-black">{lessonData?.lesson?.name || "Сабақ"}</h1>
          <div className="mr-2">
            <button onClick={handleForward}>
              <Forward />
            </button>
          </div>
        </div>

        {/* Lesson Content */}
        <div className="mt-6 px-4">
          {/* Lesson Video */}
          {lessonData?.lesson?.url ? (
            lessonData.lesson.url.includes("youtube.com") || lessonData.lesson.url.includes("youtu.be") ? (
              <YouTubePlayer videoId={lessonData.lesson.url.split("v=")[1] || lessonData.lesson.url.split("/").pop()} />
            ) : (
              <div className="video-container mx-auto mt-6">
                <video controls className="w-full max-w-[600px] rounded-md shadow-lg">
                  <source src={lessonData.lesson.url} type="video/mp4" />
                  <p>Your browser does not support the video tag.</p>
                </video>
              </div>
            )
          ) : (
            <p className="text-gray-500 text-center mt-4">Бұл сабақта бейне жоқ.</p>
          )}

          {/* Lesson Description */}
          <p className="font-normal text-lg mb-6">
            {lessonData?.lesson?.description || "Сипаттама жоқ"}
          </p>
        </div>
      </div>
    </div>
  );
}
