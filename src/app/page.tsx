"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import userStore from "@/stores/userStore";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import { getDbUrl } from "@/util";

export default function HomePage() {
  // const [billsAmounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="container h-screen p-10 bg-black text-white">
        {/* header */}
        <Header />

        <h1 className="flex justify-center mt-14 text-3xl text-white">Menu</h1>
        <ul className="flex flex-col gap-5  mt-10 text-xl text-black font-semibold">
          <li
            className=" bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/security")}
          >
            <span>Secrurity</span>
          </li>
          <li
            className="bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/cash")}
          >
            <span>Cash</span>
          </li>
        </ul>
        <div className="mt-5 text-md underline">
          <Link href={getDbUrl()} target="_blank">
            <span>open db</span>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}

// cash
// shifts
// count

//  security
// shifts
