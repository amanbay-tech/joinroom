"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import useForm from "@/app/hooks/useForm";
import useCustomMutation from "@/app/hooks/useMutation";
import { MainIcon } from "@/app/components/lib";
import { Button } from "@nextui-org/react";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(true);
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Check session storage for userId and username
  useEffect(() => {
    const telegram = window.Telegram?.WebApp;
    const storedUserId = sessionStorage.getItem("userId");
    const storedLocalUserId = localStorage.getItem("userId");
    const telegramUserId = telegram?.initDataUnsafe?.user?.id;
  
    if (storedUserId || storedLocalUserId || telegramUserId) {
      // If userId exists in sessionStorage, localStorage, or Telegram, hide modal
      setModalVisible(false);
  
      // Optionally save Telegram userId if available and not already stored
      if (!storedUserId && telegramUserId) {
        sessionStorage.setItem("userId", telegramUserId);
        localStorage.setItem("userId", telegramUserId);
      }
    } else {
      // If userId is not found, show modal
      setModalVisible(true);
    }
  }, []);
  


  const { mutateAsync: user } = useCustomMutation("user", {
    onSuccess: async (response) => {
      toast.success("Cәтті!");
      sessionStorage.setItem("userId", response.user.userId); // Save userId in session
      sessionStorage.setItem("username", username); // Save username in session
      localStorage.setItem("userId", response.user.userId);
      localStorage.setItem("username", username);

      setModalVisible(false); // Close modal on success
    },
    onError: () => {
      toast.error("Қате орын алды");
    },
  });

  const newUser = useForm(
    { username: "" },
    {
      username: (username) =>
        username.trim() === ""
          ? "Username is required"
          : /^[A-Za-z0-9_]{5,32}$/.test(username)
          ? ""
          : "Username қате форматта енгізілді",
    }
  );

  const isUsernameValid =
    username.trim() !== "" && !newUser.errors.username;

  const handleCheckUser = async () => {
    try {
      setMessageSent(false); // Reset messageSent state initially
      if (!username.trim()) {
        setMessageSent(false);
        setErrorMessage("Өтінемін username-ді енгізіңіз");
        return;
      } else if (/[^A-Za-z0-9_]/.test(username)) {
        setMessageSent(false);
        setErrorMessage("Username тек латын әріптері, сандар немесе _ символынан тұруы керек");
        return;
      } else if (username.length < 5 || username.length > 32) {
        setMessageSent(false);
        setErrorMessage("Username ұзындығы 5 пен 32 символ арасында болуы керек");
        return;
      }
      setMessageSent(true);
      const userResponse = await user({ username });
    } catch (error) {
      setMessageSent(false);
      setErrorMessage(
        <>
          <a
            href="https://t.me/JoinRoomBot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            JoinRoomBot
          </a>{" "}
          bot-ына /start деп жазыңыз
        </>
      );
    }
  };

  return (
    <div className="mx-auto h-screen">
      {/* Conditional Div for Modal Replacement */}
      {modalVisible && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-black text-lg mb-4">Пайдаланушының атын тексеру</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrorMessage(""); // Clear error message on input change
              }}
              placeholder="username-ді енгізіңіз"
              className="w-full p-2 border border-gray-300 rounded-xl mb-4"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <Button
  onPress={handleCheckUser}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
  color={isUsernameValid ? "success" : "default"}
  disabled={!isUsernameValid}
>
  Тексеру
</Button>

{messageSent && (
  <div className="mt-4 text-center">
    <p className="text-green-500 font-semibold">
      Хабарлама жіберілді! Сіздің мақұлдауыңызды күтеміз. 🤗
    </p>
    <p className="text-gray-500">
      Егер сізге хабарлама жетпесе, ботпен байланысыңыз:{" "}
      <a
        href="https://t.me/JoinRoomBot"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        JoinRoomBot
      </a>
    </p>
  </div>
)}

          </div>
        </div>
      )}

      {/* Main Content */}
      {!modalVisible && (
        <div className="mx-auto h-screen bg-[url('/image-bg.png')] bg-cover bg-no-repeat w-full max-h-full bg-[0px_0px]">
          <div className="pt-32">
            <MainIcon />
          </div>

          <h1 className="text-center items-center text-3xl font-bold text-white mt-10 mb-3">
            Join Room
          </h1>
          <p className="text-center px-4 text-white pb-10">
            Бұл командалардың тиімді әрекеттестігі мен қашықтан байланыс орнатуды жеңілдету үшін жасалған инновациялық бірлескен жұмыс платформасы.
          </p>
          <Link href="/courses" legacyBehavior>
  <a className="w-full text-[15px] flex items-center py-4 flex justify-center bg-white border rounded-full">
    Менің курстарым
  </a>
</Link>
<Link href="/courses/newcourse" legacyBehavior>
  <a className="w-full text-[15px] flex items-center mt-4 py-4 flex justify-center bg-white border rounded-full">
    Жаңа курс қосу
  </a>
</Link>

        </div>
      )}
    </div>
  );
}
