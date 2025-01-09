"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Back, MoreIcon } from "@/app/components/lib";
import useCustomQuery from "@/app/hooks/useQuery";
import useCustomMutation from "@/app/hooks/useMutation";
import { toast } from "react-toastify";

export default function Orders() {
  const [userId, setUserId] = useState(null);

    useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId") || localStorage.getItem("userId");
    setUserId(storedUserId);
  }, []);
  // Fetch orders based on userId
  const { data: orders, isLoading, isError, refetch } = useCustomQuery("orders", {
    userId,
  });

  // Mutation to manage order status
  const { mutateAsync: manageOrder } = useCustomMutation("manageOrder", {
    onSuccess: async () => {
      await refetch();
      toast.success("Сұраныс сәтті өңделді.");
    },
    onError: () => {
      toast.error("Қате орын алды.");
    },
  });

  // Handle Accept/Reject actions
  const handleOrderAction = async (order, status) => {
    try {
      const payload = {
        userId, // User ID
        courseId: order.courseId, // Course ID
        clientId: order.clientId, // Client ID
        status, // "ALLOWED" or "REJECTED"
      };

      await manageOrder(payload);
    } catch (error) {
      console.error("Error managing order:", error);
      toast.error("Сұранысты өңдеу кезінде қате пайда болды.");
    }
  };

  // Display loading state
  if (isLoading) {
    return (
        <div className="mx-auto max-w-[390px] max-h-full h-screen">
          <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
            <div className="mx-auto">
              <Link href="/">
                <Back />
              </Link>
            </div>
            <h1 className="font-bold text-xl text-black">Менің сұраныстарым</h1>
            <MoreIcon />
          </div>
          <p className="text-center">Сұраныстар жүктелуде...</p>
        </div>
      );
  }

  // Display error or no orders state
  if (isError || !orders?.pendingCourses || orders.pendingCourses.length === 0) {
    return (
      <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
          <div className="mx-auto">
            <Link href="/">
              <Back />
            </Link>
          </div>
          <h1 className="font-bold text-xl text-black">Менің сұраныстарым</h1>
          <MoreIcon />
        </div>
        <p className="text-center text-gray-500 mt-4">Сұраныстар табылмады.</p>
      </div>
    );
  }

  // Display list of orders
  return (
    <div className="mx-auto max-w-[390px] max-h-full h-screen">
        <div className="flex pt-5 sm:flex phone:flex-col mx-auto">
          <div className="mx-auto">
            <Link href="/courses">
              <Back />
            </Link>
          </div>

          <h1 className="font-bold text-xl text-black">Cұраныстар</h1>
            <div className="mx-auto">
            <Link href="/">
              <MoreIcon />
            </Link>
          </div>
        </div>
      <div className="mt-4 p-3">
        {orders?.pendingCourses?.map((order, index) => (
          <div
            key={order.courseId || `${order.courseName}-${index}`} // Ensure unique key
            className="flex flex-col border border-gray-300 rounded-lg p-4 mb-4 bg-white"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{order.courseName || "Курс атауы"}</h3>
                <p className="text-gray-600">{order.userName || "Клиент userName"}</p>
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handleOrderAction(order, "ALLOWED")}
              >
                Қабылдау
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg"
                onClick={() => handleOrderAction(order, "REJECTED")}
              >
                Бас тарту
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
