"use client";

import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { TITLES } from "@/util";

import React from "react";

export default function SecurityPage() {
  return (
    <ProtectedRoute>
      <h1 className="flex justify-center mt-10 ">security page</h1>
      <ShiftsInfo title={TITLES.security} />
    </ProtectedRoute>
  );
}
