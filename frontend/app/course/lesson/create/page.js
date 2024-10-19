import Link from "next/link";
import Image from "next/image";

export default function Edit() {
  return (
    <div className="bg-[#000000] bg-opacity-50">
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

          <h1 className="font-bold text-xl text-white">Сабақ қосу</h1>
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
        <div className="flex phone:flex-col max-w-[358px] mx-auto mt-3 mb-8 py-4 max-h-[101px] bg-white rounded-xl">
          <div className="">
            <Image
              src="/images1.png"
              alt="figma"
              width={81}
              height={81}
              className="ml-2"
            />
          </div>
          <div>
            <p className="font-bold flex phone:flex phone:flex-col">
              Figma негіздері
            </p>
            <span className="font-normal">
              Фигма негіздерін 12 сабақта <br /> үйрену
            </span>
          </div>
        </div>
        <div className="flex phone:flex-row py-3 px-1 bg-[#F5FAF5] mx-auto max-w-[358px] rounded-3xl">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 6.04201C10.3516 4.56337 8.2144 3.74695 6 3.75001C4.948 3.75001 3.938 3.93001 3 4.26201V18.512C3.96362 18.172 4.97816 17.9989 6 18C8.305 18 10.408 18.867 12 20.292M12 6.04201C13.6483 4.56328 15.7856 3.74686 18 3.75001C19.052 3.75001 20.062 3.93001 21 4.26201V18.512C20.0364 18.172 19.0218 17.9989 18 18C15.7856 17.997 13.6484 18.8134 12 20.292M12 6.04201V20.292"
              stroke="black"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <div>
            <span className="font-bold pr-2 pl-3">Сабақ 1. </span> (әдепкідей
            кезекпен сақталған){" "}
          </div>
        </div>
        <div className="flex phone:flex-row mx-auto">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-4 mt-2"
          >
            <path
              d="M10 7.5V10.625M17.5 10C17.5 10.9849 17.306 11.9602 16.9291 12.8701C16.5522 13.7801 15.9997 14.6069 15.3033 15.3033C14.6069 15.9997 13.7801 16.5522 12.8701 16.9291C11.9602 17.306 10.9849 17.5 10 17.5C9.01509 17.5 8.03982 17.306 7.12987 16.9291C6.21993 16.5522 5.39314 15.9997 4.6967 15.3033C4.00026 14.6069 3.44781 13.7801 3.0709 12.8701C2.69399 11.9602 2.5 10.9849 2.5 10C2.5 8.01088 3.29018 6.10322 4.6967 4.6967C6.10322 3.29018 8.01088 2.5 10 2.5C11.9891 2.5 13.8968 3.29018 15.3033 4.6967C16.7098 6.10322 17.5 8.01088 17.5 10ZM10 13.125H10.0067V13.1317H10V13.125Z"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p className="text-white ml-2 mt-[4px]">Ақпаратты толықтырыңыз</p>
        </div>
        <div className="ml-5 mt-2 max-w-[345px]">
          <div className="bg-[#F5F5F5] flex phone:flex-col mb-5 max-w-[345px] mx-auto focus:outline-none rounded-full py-4">
            <input
              type="text"
              placeholder="Курс тақырыбы"
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="bg-[#F5F5F5] flex phone:flex-col mb-5 max-w-[345px] mx-auto focus:outline-none rounded-full py-4">
            <input
              type="text"
              placeholder="Курсты сипаттау"
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
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="bg-[#F5F5F5] flex phone:flex-col mb-5 max-w-[345px] mx-auto focus:outline-none rounded-full py-4">
            <input
              type="text"
              placeholder="Видеоға сілтеме	"
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
                d="M13.125 8.75L17.0583 4.81667C17.1457 4.72937 17.2571 4.66993 17.3782 4.64586C17.4994 4.62179 17.625 4.63417 17.7391 4.68143C17.8532 4.72869 17.9508 4.80871 18.0195 4.91139C18.0882 5.01407 18.1249 5.1348 18.125 5.25833V14.7417C18.1249 14.8652 18.0882 14.9859 18.0195 15.0886C17.9508 15.1913 17.8532 15.2713 17.7391 15.3186C17.625 15.3658 17.4994 15.3782 17.3782 15.3541C17.2571 15.3301 17.1457 15.2706 17.0583 15.1833L13.125 11.25M3.75 15.625H11.25C11.7473 15.625 12.2242 15.4275 12.5758 15.0758C12.9275 14.7242 13.125 14.2473 13.125 13.75V6.25C13.125 5.75272 12.9275 5.27581 12.5758 4.92417C12.2242 4.57254 11.7473 4.375 11.25 4.375H3.75C3.25272 4.375 2.77581 4.57254 2.42417 4.92417C2.07254 5.27581 1.875 5.75272 1.875 6.25V13.75C1.875 14.2473 2.07254 14.7242 2.42417 15.0758C2.77581 15.4275 3.25272 15.625 3.75 15.625Z"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <Link href="/course/lessons">
          <button className="px-40 mt-10 text-xl mx-auto border-none py-4 flex justify-center  bg-[#1C8ED7] border rounded-full">
            <p className="text-white">Қосу</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
