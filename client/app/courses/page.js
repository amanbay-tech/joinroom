"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
// import  Back  from "@/components/back"
// import  MoreIcon  from "@/components/more"
import { Back, MoreIcon, BookIcon, ArrowIcon } from '@/components/lib';


export default function Lessons() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="">
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
          <div className="mx-auto">
            <Link href="/">
              <Back/>
            </Link>
          </div>

          <h1 className="font-bold text-xl text-black">Менің курстарым</h1>
          <MoreIcon/>
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
        <h2 className="font-bold text-base ml-3">Менің курстарым</h2>
        <div className="ml-3">
          <a className="flex phone:flex-row py-4 bg-[#F5FAF5] max-w-[358px] mt-3 rounded-xl">
          <BookIcon/>
            <span className="font-bold ml-3 mr-52">Курс 2.</span>
            <ArrowIcon/>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#FFF6F4] max-w-[358px] mt-3 rounded-xl">
           <BookIcon/>
            <span className="font-bold ml-3 mr-52">Курс 2.</span>
            <ArrowIcon/>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#F2F8FC] max-w-[358px] mt-3 rounded-xl">
          <BookIcon/>
            <span className="font-bold ml-3 mr-52">Курс 2.</span>
            <ArrowIcon/>
          </a>
          <a className="flex phone:flex-row py-4 bg-[#F5FAF5] max-w-[358px] mt-3 rounded-xl">
          <BookIcon/>
            <span className="font-bold ml-3 mr-52">Курс 2.</span>
            <ArrowIcon/>
          </a>
        </div>

        {/* <button
          onClick={openModal}
          className="px-40 mt-10 text-xl mx-auto border-none py-4 flex justify-center  bg-[#1C8ED7] border rounded-full"
        >
          <p className="text-white">Қосу</p>
        </button> */}
        {/* <Modal isOpen={isModalOpen} onClose={closeModal} /> */}
      </div>
    </div>
  );
}
