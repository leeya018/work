"use client";
import BillsCalculator from "@/components/BillsCalculator";
import CoinCalculator from "@/components/CoinCalculator";
import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function CashPage() {
  const [chosen, setChosen] = useState<string>("shifts");
  const router = useRouter();
  return (
    <ProtectedRoute>
      <h1 className="flex justify-center mt-10 ">cash page</h1>
      <button
        className="btn absolute top-0 left-0"
        onClick={() => router.back()}
      >
        back
      </button>
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className={`${
            chosen === "shifts" && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen("shifts")}
        >
          shifts
        </button>
        <button
          className={`${
            chosen === "cash_count" && "bg-black text-white"
          } text-black px-3 py-2`}
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
    </ProtectedRoute>
  );
}
