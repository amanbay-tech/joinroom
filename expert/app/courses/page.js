"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Back, MoreIcon, BookIcon, ArrowIcon, MainIcon } from "@/app/components/lib";
import useCustomQuery from "@/app/hooks/useQuery";
import useCustomMutation from "@/app/hooks/useMutation";
import { useSearchParams } from "next/navigation";

import { toast } from "react-toastify";

export default function Courses() {
  const [userId, setUserId] = useState(null);
  const searchParams = useSearchParams();
  const [isCourseModalVisible, setIsCourseModalVisible] = useState(false); // State for modal visibility
  const [courseForm, setCourseForm] = useState({
    name: "",
    description: "",
  }); // State for course form inputs

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    // Check if 'showModal' parameter exists in the URL
    const showModal = searchParams.get("showModal") === "true";
    setIsCourseModalVisible(showModal);
  }, [searchParams]);

  // Use `useCustomQuery` to fetch courses based on userId
  const { data: courses, isLoading, isError, refetch } = useCustomQuery("myCourses", {
    userId,
  });

  const { mutateAsync: createCourse } = useCustomMutation("createCourse", {
    onSuccess: async (response) => {
      await refetch(); // Refetch courses list
      toast.success("Курс сәтті қосылды!");
    },
    onError: () => {
      toast.error("Қате орын алды.");
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = async () => {
    if (!userId || !courseForm.name || !courseForm.description) {
      toast.error("Барлық өрістерді толтырыңыз.");
      return;
    }

    try {
      // Send the data to the server
      const newCourseData = {
        userId,
        name: courseForm.name,
        description: courseForm.description,
      };

      await createCourse(newCourseData);
      setIsCourseModalVisible(false); // Close modal on success
      setCourseForm({ name: "", description: "" }); // Reset form
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Курс қосу кезінде қате пайда болды.");
    }
  };

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
            <span className="font-normal leading-1 break-words line-clamp-2">
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
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white p-4 shadow-lg">
          <button
            className="w-full text-[15px] rounded-xl flex items-center justify-center gap-2 border px-4 py-3 bg-blue-500 text-white"
            onClick={() => setIsCourseModalVisible(true)}
          >
            Жаңа курс қосу
          </button>
        </div>

        {/* Modal */}
        {isCourseModalVisible && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
              <h2 className="font-bold text-xl mb-4 text-center">Жаңа курс қосу</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Курстың аты"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={courseForm.name}
                  onChange={handleInputChange}
                />
                <textarea
                  name="description"
                  placeholder="Курстың сипаттамасы"
                  className="w-full p-2 border border-gray-300 rounded-lg resize-none"
                  value={courseForm.description}
                  onChange={handleInputChange}
                  rows="6"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-between">
                <button
                  className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  onClick={() => setIsCourseModalVisible(false)}
                >
                  Жабу
                </button>
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleCreateCourse}
                >
                  Қосу
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
