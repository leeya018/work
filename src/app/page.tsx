"use client";
import React, { useState } from "react";
import CoinCalculator from "@/components/CoinCalculator";
import BillsCalculator from "@/components/BillsCalculator";
import Link from "next/link";

export default function HomePage() {
  // const [billsAmounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));

  return (
    <div>
      <Link href={"/cash"} className="">
        <span>cash</span>
      </Link>
    </div>
  );
}
