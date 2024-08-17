"use client";
import BillsCalculator from "@/components/BillsCalculator";
import CoinCalculator from "@/components/CoinCalculator";
import React from "react";

export default function CashPage() {
  return (
    <div className="">
      <h1 className="flex justify-center mt-10 ">cash page</h1>
      <CoinCalculator />
      <BillsCalculator />
    </div>
  );
}
