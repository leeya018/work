"use client";
import BillsCalculator from "@/components/BillsCalculator";
import Vegs from "@/components/Vegs";
import CoinCalculator from "@/components/CoinCalculator";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function CashPage() {
  const [chosen, setChosen] = useState<string>("shifts");
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="container min-h-screen p-10 bg-black">
        <Header />
        <h1 className="flex justify-center mt-14 text-3xl text-white ">
          cash page
        </h1>
        <div className="text-xl font-semibold text-white flex justify-center mt-4">
          my code : 103
        </div>
        <div className="text-xl font-semibold text-white flex justify-center mt-4">
          my hakafa : 555
        </div>
        <div className="flex items-center justify-center gap-10 mt-10 text-xl font-semibold text-white">
          <button
            className={`${
              chosen === "shifts" && "bg-yellow p-5 rounded-xl text-black"
            }  px-3 py-2 bg-gray-900 rounded-xl`}
            onClick={() => setChosen("shifts")}
          >
            shifts
          </button>
          <button
            className={`${
              chosen === "cash_count" && "bg-yellow p-5 rounded-xl text-black"
            }  px-3 py-2 bg-gray-900 rounded-xl`}
            onClick={() => setChosen("cash_count")}
          >
            cash count
          </button>
          <button
            className={`${
              chosen === "codes" && "bg-yellow p-5 rounded-xl text-black"
            }  px-3 py-2 bg-gray-900 rounded-xl`}
            onClick={() => setChosen("codes")}
          >
            codes
          </button>
        </div>
        {chosen === "cash_count" && (
          <div>
            <CoinCalculator />
            <BillsCalculator />
          </div>
        )}

        {chosen === "shifts" && <ShiftsInfo title={"cash"} />}
        {chosen === "codes" && <Vegs />}
      </div>
    </ProtectedRoute>
  );
}
