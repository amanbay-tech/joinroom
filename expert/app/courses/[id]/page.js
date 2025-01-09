"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useCustomQuery from "@/app/hooks/useQuery";
import useCustomMutation from "@/app/hooks/useMutation";
import { toast } from "react-toastify";
import { Back, MoreIcon, BookIcon, ArrowIcon } from "@/app/components/lib";

export default function CourseDetails() {
  const { id } = useParams(); // Get the course ID from the URL
  const courseId = id; // Set courseId from route params
  const [userId, setUserId] = useState(null);
  const [courseData, setCourseData] = useState(null);

  // State for modal visibility and form inputs
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lessonForm, setLessonForm] = useState({
    name: "",
    description: "",
    url: "",
  });

  // Fetch userId from sessionStorage or localStorage
  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);

  // Fetch course details using courseId and userId
  const { data, isLoading, isError, refetch } = useCustomQuery("myCourse", {
    courseId,
    userId,
  });
  const { mutateAsync: addLesson } = useCustomMutation("addLesson", {
    onSuccess: async (response) => {
      await refetch();
    },
    onError: () => {
      toast.error("Қате орын алды");
    },
  });


  useEffect(() => {
    if (data) {
      setCourseData(data);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLessonForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLesson = async () => {
    try {
      // Prepare the lesson data
      const newLessonData = {
        userId,
        courseId,
        name: lessonForm.name,
        description: lessonForm.description,
        url: lessonForm.url,
        orderNumber: courseData.course?.lesson?.length + 1 || 1, // Assign the next order number
      };  
      // Call the mutation to add the lesson
      await addLesson(newLessonData);  
      setIsModalVisible(false);
  
      // Optionally clear the form
      setLessonForm({ name: "", description: "", url: "" });
    } catch (error) {
      console.error("Error adding lesson:", error);
      toast.error("Сабақты қосу кезінде қате орын алды.");
    }
  };
  
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
                  index % 3 === 0
                    ? "bg-[#F5FAF5]"
                    : index % 3 === 1
                    ? "bg-[#FFF6F4]"
                    : "bg-[#F2F8FC]"
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

          {/* Button to show modal */}
          <div className="fixed bottom-0 left-0 w-full z-50 bg-white p-4 shadow-lg">
            <button
              className="w-full text-[15px] rounded-xl flex items-center justify-center gap-2 border px-4 py-3 bg-blue-500 text-white"
              onClick={() => setIsModalVisible(true)}
            >
              Жаңа сабақ қосу
            </button>
          </div>

          {/* Modal */}
          {isModalVisible && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="font-bold text-xl mb-4 text-center">Жаңа сабақ қосу</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Сабақтың аты"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={lessonForm.name}
                    onChange={handleInputChange}
                  />
                  <textarea
                    name="description"
                    placeholder="Сабақтың сипаттамасы"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="6" // Increase the number of rows for a larger input area
                    value={lessonForm.description}
                    onChange={handleInputChange}
                  ></textarea>
                  <input
                    type="text"
                    name="url"
                    placeholder="Сабақтың URL"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={lessonForm.url}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                    onClick={() => setIsModalVisible(false)}
                  >
                    Болдырмау
                  </button>
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleAddLesson}
                  >
                    Қосу
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
