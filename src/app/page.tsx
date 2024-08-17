"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  // const [billsAmounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));

  return (
    <div className="container h-screen p-10">
      <h1 className="w-full flex justify-center  text-xl font-bold">Menu</h1>
      <ul className="flex flex-col gap-5 ml-3 mt-5 ">
        <li className="underline text-blue-500">
          <Link href="/shifts">Shifts</Link>
        </li>
        <li className="underline text-blue-500">
          <Link href="/cash">Cash</Link>
        </li>
      </ul>
    </div>
  );
}
