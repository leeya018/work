"use client";
import Cash from "@/views/cash";
import Header from "@/components/Header";
import Home from "@/views/Home";
import ProtectedRoute from "@/components/protectedRoute";
import Security from "@/views/security";
import React, { useState } from "react";

export default function MainPage() {
  const [chosen, setChosen] = useState<string>("home");

  const handleChosenComp = (compName: string) => {
    setChosen(compName);
  };
  return (
    <ProtectedRoute>
      {/* items */}
      <div>
        {/* header */}
        <Header handleChosenComp={handleChosenComp} />
        {chosen === "home" && <Home handleChosenComp={handleChosenComp} />}
        {chosen === "cash" && <Cash />}
        {chosen === "security" && <Security />}
      </div>
    </ProtectedRoute>
  );
}
