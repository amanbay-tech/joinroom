import Image from "next/image";
import Link from "next/link";
export default function Lessons() {
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

          <h1 className="font-bold text-xl text-white">Сабақтар</h1>
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
      </div>
    </div>
  );
}
