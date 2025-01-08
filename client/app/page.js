"use client";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Head from "next/head";
import Icon from "../components/icon";
import Link from "next/link";
import useForm from "@/app/hooks/useForm";
import useCustomQuery from "@/app/hooks/useQuery";
import { toast } from "react-toastify";
import useCustomMutation from "@/app/hooks/useMutation";
import MainIcon from "@/components/main";

export default function Home() {
  const [buttonWidth, setButtonWidth] = useState("auto");
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const joinRoomRef = useRef(null);

  useEffect(() => {
    // Adjust the width of the button to match the width of the "Join room" text
    if (joinRoomRef.current) {
      setButtonWidth(`${joinRoomRef.current.offsetWidth + 50}px`); // Increased width
    }
  }, []);

  const { mutateAsync: user, isPending } = useCustomMutation(
    "user",
    {
      onSuccess: async () => {
        toast.success("Cәтті!");
      },
      onError: () => {
        toast.error("Қате орын алды"); // Assuming mutationError is defined elsewhere
      },
    },
  );

  const newUser = useForm(
    { username: "" },
    {
      username: (username) =>
        /^[A-Za-z0-9_]{5,32}$/.test(username)
          ? ""
          : "Username қате форматта енгізілді", // Error message for invalid username
    },
  );

  const handleCreateUser = () => {
    // Logic for creating a user
    console.log("Creating user with username:", username);
    // Call API or handle logic to create user
    setModalVisible(false);
  };

  const handleCheckUser = async () => {
    // Logic for checking user by ID or username
    console.log("Checking user with ID/Username:", userId || username);
    // Call API or handle logic to check user

    if (username) {
      try {
        const userResponse = await user({ username }); // Send username to the mutation
        console.log(userResponse);
        setModalVisible(false); // Hide the modal on success
      } catch (error) {
        console.error("Error checking user:", error);
        toast.error("Ошибка при проверке пользователя.");
      }
    } else {
      toast.error("Username is required.");
    }
  };

  const isUsernameValid = !newUser.errors.username; // Check if username is valid

  return (
    <div className="mx-auto h-screen bg-[url('/image-bg.png')] bg-cover bg-no-repeat w-full max-h-full bg-[0px_0px]">
      <div className="pt-32">
        <MainIcon />
      </div>

      <h1 className="text-center items-center text-3xl font-bold text-white mt-10 mb-3">
        Join Room
      </h1>
      <p className="text-center px-4 text-white pb-10">
        это инновационная платформа совместной работы, созданная для
        эффективного взаимодействия команд и упрощения удаленной коммуникации.
      </p>
      <Link href="/courses">
        <button className="w-full text-[15px] flex items-center py-4 flex justify-center bg-white border rounded-full">
          Менің курстарым
        </button>
      </Link>
      <Link href="/courses/newcourse">
        <button className="w-full text-[15px] flex items-center mt-4 py-4 flex justify-center bg-white border rounded-full">
          Жаңа курсқа жазылу
        </button>
      </Link>

      {/* Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4">Check User</h2>
            <div className="mb-4">
              <label className="block text-lg mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full p-2 border rounded-lg"
              />
            </div>
            
            {/* Display error message if username is invalid */}
            {newUser.errors.username && (
              <p className="text-red-500 text-sm mb-4">{newUser.errors.username}</p>
            )}

            <div className="flex justify-center">
              <button
                onClick={handleCheckUser}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                disabled={isPending || !isUsernameValid} // Disable button if pending or username is invalid
              >
                Check User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
