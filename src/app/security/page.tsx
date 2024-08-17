"use client";

import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { TITLES } from "@/util";
import { useRouter } from "next/navigation";

import React from "react";

export default function SecurityPage() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <button
        className="btn absolute top-0 left-0"
        onClick={() => router.back()}
      >
        back
      </button>
      <h1 className="flex justify-center mt-10 ">security page</h1>
      <ShiftsInfo title={TITLES.security} />
    </ProtectedRoute>
  );
}
