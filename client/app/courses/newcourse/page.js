"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Back, MoreIcon, BookIcon, MainIcon } from "@/app/components/lib";
import useCustomQuery from "@/app/hooks/useQuery";
import useCustomMutation from "@/app/hooks/useMutation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function NewCourses() {
  const [userId, setUserId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false); // Confirmation visibility state
  const [isModalVisible, setIsModalVisible] = useState(false); // Confirmation visibility state

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Use `useCustomQuery` to fetch courses based on userId
  const { data: courses, isLoading, isError, refetch } = useCustomQuery("allCourses", {
    userId,
  });
  const { mutateAsync: couseOrder } = useCustomMutation("couseOrder", {
    onSuccess: async (response) => {
      await refetch();
      setIsConfirmationVisible(false)
      setIsModalVisible(true)
    },
    onError: () => {
      toast.error("Қате орын алды");
    },
  });

  useEffect(() => {
    // Set the first course as the default selected course
    if (courses?.courses && courses.courses.length > 0) {
      setSelectedCourse(courses.courses[0]);
    }
  }, [courses]);

  const handleSubscribe = async () => {
    try {
      if (!userId || !selectedCourse?.id) {
        toast.error("Пайдаланушы немесе курс ID табылмады.");
        return;
      }
  
      // Call the mutation with courseId and userId
      await couseOrder({
        courseId: selectedCourse.id,
        userId: userId,
      });
  
      console.log(`User ${userId} subscribed to course ${selectedCourse.id}`);
      toast.success("Курсқа сәтті жазылдыңыз!");
    } catch (error) {
      console.error("Subscription failed:", error);
      toast.error("Қате орын алды");
    }
  };
  
  if (isLoading) {
    return <p className="text-center">Курстар жүктелуде...</p>;
  }

  if (isError || !courses?.courses) {
    return (
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
          <div className="mx-auto">
            <Link href="/">
              <Back />
            </Link>
          </div>
          <h1 className="font-bold text-xl text-black">Қолжетімді курстар</h1>
          <MoreIcon />
        </div>
        <div className="flex phone:flex-col max-w-[358px] mx-auto mt-3 mb-3 pt-3 pb-4 bg-[#F4F5F9] rounded-xl">
          <div className="mx-2 mb-2">
            <MainIcon />
          </div>
          <div className="ml-2 pr-2">
            <p className="font-bold break-words">Қолжетімді курстар</p>
            <span className="font-normal break-words">
              Өкінішке орай сіз үшін жаңа курстар табылмады
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[390px] max-h-full h-screen">
      {/* Header */}
      <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
        <div className="mx-auto">
          <Link href="/">
            <Back />
          </Link>
        </div>
        <h1 className="font-bold text-xl text-black mt-2">Қолжетімді курстар</h1>
        <MoreIcon />
      </div>

      {/* Highlighted Selected Course */}
      {selectedCourse && (
        <div className="flex phone:flex-col max-w-[358px] mx-auto mt-3 mb-3 pt-3 pb-4 bg-[#F4F5F9] rounded-xl">
          <div className="mx-2 mb-2">
            <MainIcon />
          </div>
          <div className="ml-2 pr-2">
            <p className="font-bold break-words">{selectedCourse?.name || "Cіздің курсыңыз"}</p>
            <span className="font-normal break-words">
              {selectedCourse?.description || "Курстың сипаттамасы"}
            </span>
          </div>
        </div>
      )}

      {/* Available Courses List */}
      <h2 className="font-bold text-base ml-3">Қолжетімді курстар</h2>
      <div className="ml-3">
        {courses.courses.length > 0 ? (
          courses.courses.map((courseData, index) => (
            <div
              key={courseData.id}
              onClick={() => setSelectedCourse(courseData)} // Update the selected course
              className={`flex items-center justify-between py-4 px-4 cursor-pointer ${
                index % 3 === 0 ? "bg-[#F5FAF5]" : index % 3 === 1 ? "bg-[#FFF6F4]" : "bg-[#F2F8FC]"
              } max-w-[358px] mt-3 rounded-xl`}
            >
              <div className="flex items-center">
                <BookIcon />
                <span className="font-bold ml-3 break-all truncate">
                  {courseData?.name || "Аты жоқ курс"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4 text-gray-600">Курстар табылмады.</p>
        )}
      </div>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-white p-4 shadow-lg">
        <button
          className="w-full text-[15px] rounded-xl flex items-center justify-center gap-2 border px-4 py-3 bg-blue-500 text-white"
          onClick={() => setIsConfirmationVisible(true)} // Show confirmation div
        >
          Курсқа жазылу
        </button>
      </div>

      {/* Subscription Confirmation Div */}
  {/* Confirmation Modal */}
{isConfirmationVisible && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 className="font-bold text-xl mb-4">Курсқа жазылу</h2>
      <p className="text-gray-700 mb-6">
        Сіз <span className="font-bold">{selectedCourse?.name}</span> курсына жазылғыңыз келетініне сенімдісіз бе?
      </p>
      <div className="flex justify-between">
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsConfirmationVisible(false); // Close the confirmation modal
          }}
          className="bg-red-500 text-white w-1/2 mx-2 rounded-xl"
        >
          Жоқ
        </button>
        <button
          onClick={async () => {
            await handleSubscribe(); // Trigger subscription
            setIsConfirmationVisible(false); // Close this modal
            setIsModalVisible(true); // Open the success modal
          }}
          className="bg-green-500 text-white w-1/2 mx-2 rounded-xl"
        >
          Иә
        </button>
      </div>
    </div>
  </div>
)}

{/* Success Modal */}
{isModalVisible && (
  <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
      <h2 className="font-bold text-xl mb-4">Рахмет!</h2>
      <p className="text-gray-700 mb-6">
        <span className="font-bold">{selectedCourse?.name}</span> курсына жазылуға сұраныс жіберілді. Сұранысыңыз қабылданғанда{" "}
        <a
          href="https://t.me/JoinRoomBot"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          @JoinRoomBot
        </a>{" "}
        cізге хабарлама жібереді.
      </p>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsModalVisible(false); // Close the success modal
        }}
        className="bg-blue-500 text-white w-full rounded-xl"
      >
        Жабу
      </button>
    </div>
  </div>
)}


    </div>
  );
}
