"use client";

import Link from "next/link";
import { createCourse } from "@/actions/createCourse";
import { useFormStatus } from "react-dom";

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
            <svg
              width="44"
              height="44"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto"
            >
              <rect width="44" height="44" rx="22" fill="#F4F5F9" />
              <path
                d="M25.3334 15.3333L18.6667 22L25.3334 28.6667"
                stroke="#323232"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <h1 className="font-bold text-xl">Жаңа курс</h1>
        <svg
          width="44"
          height="44"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mx-auto"
        >
          <rect width="44" height="44" rx="22" fill="#F4F5F9" />
          <path
            d="M27.5023 22.003C27.5023 22.2781 27.7274 22.5032 28.0025 22.5002C28.2776 22.5002 28.5027 22.2751 28.5027 22C28.5027 21.7249 28.2776 21.4998 28.0025 21.4998C27.7274 21.4998 27.5023 21.7249 27.5023 22.003"
            stroke="#323232"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.4998 22.003C21.4998 22.2781 21.7248 22.5032 22 22.5002C22.2751 22.5002 22.5002 22.2751 22.5002 22C22.5002 21.7249 22.2751 21.4998 22 21.4998C21.7248 21.4998 21.4998 21.7249 21.4998 22.003"
            stroke="#323232"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.4973 22.003C15.4973 22.2781 15.7224 22.5032 15.9975 22.5002C16.2726 22.5002 16.4977 22.2751 16.4977 22C16.4977 21.7249 16.2726 21.4998 15.9975 21.4998C15.7224 21.4998 15.4973 21.7249 15.4973 22.003"
            stroke="#323232"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
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
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.4314 5.25465L14.7452 9.56841M6.98042 13.0194L9.56867 10.4312M6.56888 17.3332H2.66666V13.4309C2.66661 13.2329 2.70561 13.0368 2.7814 12.8538C2.85719 12.6708 2.96831 12.5046 3.10839 12.3646L12.364 3.10898C12.504 2.96872 12.6703 2.85744 12.8533 2.78151C13.0364 2.70559 13.2326 2.6665 13.4308 2.6665C13.629 2.6665 13.8252 2.70559 14.0082 2.78151C14.1913 2.85744 14.3576 2.96872 14.4976 3.10898L16.8908 5.50226C17.0311 5.64225 17.1424 5.80854 17.2183 5.99159C17.2942 6.17464 17.3333 6.37087 17.3333 6.56905C17.3333 6.76722 17.2942 6.96345 17.2183 7.14651C17.1424 7.32956 17.0311 7.49585 16.8908 7.63584L7.63524 16.8914C7.35227 17.174 6.96879 17.3329 6.56888 17.3332Z"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-[#F5F5F5] flex phone:flex-col max-w-[345px] mx-auto focus:outline-none rounded-full py-4">
          <input
            type="text"
            placeholder="Описание курса"
            name="description"
            className="bg-[#F5F5F5] ml-3 min-w-[302px] focus:outline-none"
          />
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.201 6.74058H16.0655C16.7663 6.74058 17.3334 7.30769 17.3334 8.00843V16.0661C17.3334 16.7661 16.7663 17.3332 16.0655 17.3332H7.19384C6.4931 17.3332 5.92599 16.7661 5.92599 16.0653V14.8887M7.05044 2.6665V4.29613M11.9393 2.6665V4.29613M6.89562 7.55539H11.7845M6.89562 10.8147H11.7845M3.48236 14.8887H12.6995C13.2447 14.8887 13.7531 14.6166 14.0554 14.1627L14.6535 13.2648C15.0104 12.7295 15.201 12.1004 15.201 11.4567V5.11095C15.201 4.21058 14.4718 3.48132 13.5714 3.48132H5.42325C4.52288 3.48132 3.79362 4.21058 3.79362 5.11095V10.8603C3.79362 11.3663 3.67547 11.8649 3.44977 12.318L2.75392 13.7097C2.48258 14.2515 2.87695 14.8887 3.48236 14.8887Z"
              stroke="#222222"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="bg-[#F4F5F9] max-w-[358px] mx-auto mt-5 px-16 pb-8 pt-5 max-h-[153px] rounded-xl">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-16 "
          >
            <path
              d="M24.1152 36.8V23.2M19.9546 27.0857L24.1152 22.8755L28.2759 27.0857M31.7952 36.8H36.7104C40.4122 36.8 43.2001 33.7458 43.2001 30C43.2001 26.2542 40.4122 23.2 36.7104 23.2H35.8752V21.2571C35.8752 14.8263 30.7104 9.60001 24.3552 9.60001C18.6394 9.60001 13.9008 13.8315 13.0023 19.359C8.43845 19.5941 4.80005 23.3807 4.80005 28.0571C4.80005 32.8851 8.66885 36.8 13.44 36.8H16.4352"
              stroke="#C0C0C0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="pb-5 text-center text-[#8D8D9D]">
            Загрузите фон страницы <br /> размером 1080х1920
          </p>
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
