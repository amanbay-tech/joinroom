"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Modal from "../../../components/modal";
export default function Lessons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="">
      <div className=" mx-auto max-w-[390px] max-h-full h-screen">
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Link>
          </div>

          <h1 className="font-bold text-xl text-black">Сабақтар</h1>
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
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21.4998 22.003C21.4998 22.2781 21.7248 22.5032 22 22.5002C22.2751 22.5002 22.5002 22.2751 22.5002 22C22.5002 21.7249 22.2751 21.4998 22 21.4998C21.7248 21.4998 21.4998 21.7249 21.4998 22.003"
              stroke="#323232"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.4973 22.003C15.4973 22.2781 15.7224 22.5032 15.9975 22.5002C16.2726 22.5002 16.4977 22.2751 16.4977 22C16.4977 21.7249 16.2726 21.4998 15.9975 21.4998C15.7224 21.4998 15.4973 21.7249 15.4973 22.003"
              stroke="#323232"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div className="flex phone:flex-col max-w-[358px] mx-auto mt-3 mb-8 py-4 max-h-[101px] bg-[#F4F5F9] rounded-xl">
          <div className="">
            <Image
              src="/images1.png"
              alt="figma"
              width={81}
              height={81}
              className="ml-2"
            />
          </div>
          <div className="ml-2">
            <p className="font-bold flex phone:flex phone:flex-col">
              Figma негіздері
            </p>
            <span className="font-normal leading-1">
              Фигма негіздерін 12 сабақта <br /> үйрену
            </span>
          </div>
        </div>
        <h2 className="font-bold text-base ml-3">Сабақтар</h2>
        <div className="ml-3">
          <a className="flex phone:flex-row py-4 bg-[#F5FAF5] max-w-[358px] mt-3 rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3"
            >
              <path
                d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="font-bold ml-3 mr-52">Сабақ 1.</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M15.4881 10H4.77869"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 14.1667L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 5.83337L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#FFF6F4] max-w-[358px] mt-3 rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3"
            >
              <path
                d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="font-bold ml-3 mr-52">Сабақ 2.</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M15.4881 10H4.77869"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 14.1667L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 5.83337L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#F2F8FC] max-w-[358px] mt-3 rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3"
            >
              <path
                d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="font-bold ml-3 mr-52">Сабақ 3.</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M15.4881 10H4.77869"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 14.1667L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 5.83337L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#F5FAF5] max-w-[358px] mt-3 rounded-xl">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-3"
            >
              <path
                d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span className="font-bold ml-3 mr-52">Сабақ 4.</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className=""
            >
              <path
                d="M15.4881 10H4.77869"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 14.1667L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.6633 5.83337L15.4881 10"
                stroke="#323232"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
        </div>

        <button
          onClick={openModal}
          className="px-40 mt-10 text-xl mx-auto border-none py-4 flex justify-center  bg-[#1C8ED7] border rounded-full"
        >
          <p className="text-white">Қосу</p>
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </div>
    </div>
  );
}
