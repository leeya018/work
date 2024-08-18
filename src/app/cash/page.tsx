"use client";
import BillsCalculator from "@/components/BillsCalculator";
import CoinCalculator from "@/components/CoinCalculator";
import Header from "@/components/Header";
import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

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
        </div>
        {chosen === "cash_count" && (
          <div>
            <CoinCalculator />
            <BillsCalculator />
          </div>
        )}

        {chosen === "shifts" && <ShiftsInfo title={"cash"} />}
      </div>
    </ProtectedRoute>
  );
}
