"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import userStore from "@/stores/userStore";
import Header from "@/components/Header";

export default function HomePage() {
  // const [billsAmounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));

  return (
    <ProtectedRoute>
      <div className="container h-screen p-10 bg-black text-white">
        {/* header */}
        <Header />

        <h1 className="w-full flex mt-10  text-3xl font-semibold">Menu</h1>
        <ul className="flex flex-col gap-5  mt-10 text-xl text-black font-semibold">
          <li className=" bg-yellow p-5 rounded-xl">
            <Link href="/security">Secrurity</Link>
          </li>
          <li className="bg-yellow p-5 rounded-xl">
            <Link href="/cash">Cash</Link>
          </li>
        </ul>
      </div>
    </ProtectedRoute>
  );
}

// cash
// shifts
// count

//  security
// shifts
