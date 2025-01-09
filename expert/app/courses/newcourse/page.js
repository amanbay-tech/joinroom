"use client";

import Link from "next/link";
import { createCourse } from "@/actions/createCourse";
import { useFormStatus } from "react-dom";
import { Back, MoreIcon, NoteIcon, PenIcon } from "@/components/lib";

export default function Create() {
  const createCourseAction = async (formData) => {
    const data = {
      userId: 1,
      name: formData.get("name"),
      description: formData.get("description"),
    };

    const course = await createCourse(data);
    if (course) {
      alert("Курсты�� жа��а ��осылды!");
    } else {
      alert("Курсты�� жа��а жасалмады!");
    }
  };

  return (
    <div className="max-h-full h-screen">
      <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
        <div className="mx-auto">
          <Link href="/">
          <Back/>
          </Link>
        </div>

        <h1 className="font-bold text-xl">Жаңа курс</h1>
        <MoreIcon/>
      </div>
      <div className="max-w-[345px] mx-auto mt-9 flex phone:flex-col rounded-xl">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mt-4 mr-2"
        >
          <path
            d="M12 9V12.75M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12ZM12 15.75H12.008V15.758H12V15.75Z"
            stroke="#0066FF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="w-full text-[#0066FF]">
          Сначала создайте курс, затем добавьте уроки.
        </p>
      </div>
      <form action={createCourseAction}>
        <div className="bg-[#F5F5F5] flex phone:flex-col phone:justify-between max-w-[345px] rounded-full mb-5 mt-5 mx-auto py-4">
          <input
            type="text"
            placeholder="Название курса"
            name="name"
            className="bg-[#F5F5F5] ml-3 min-w-[302px] focus:outline-none"
          />
          <NoteIcon/>
        </div>

        <div className="bg-[#F5F5F5] flex phone:flex-col max-w-[345px] mx-auto focus:outline-none rounded-full py-4">
          <input
            type="text"
            placeholder="Описание курса"
            name="description"
            className="bg-[#F5F5F5] ml-3 min-w-[302px] focus:outline-none"
          />
         <PenIcon/>
        </div>

       
        <SaveButton />
      </form>
    </div>
  );
}

function SaveButton() {
  const { pending } = useFormStatus();

  if (pending) {
    return (
      <button className="cursor-not-allowed px-40 mt-10 text-xl mx-auto py-4 flex justify-center bg-[#F4F5F9] border rounded-full">
        Сохраняется...
      </button>
    );
  }

  return (
    <button className="px-40 mt-10 text-xl mx-auto py-4 flex justify-center  bg-[#1C8ED7] border rounded-full">
      <p className="text-white">Сохранить</p>
    </button>
  );
}
