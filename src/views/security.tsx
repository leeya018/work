"use client";

import Header from "@/components/Header";
import ProtectedRoute from "@/components/protectedRoute";
import ShiftsInfo from "@/components/ShiftsInfo";
import { shiftStore } from "@/stores/shiftStore";
import { TITLES } from "@/util";
import { observer } from "mobx-react-lite";

import React from "react";

function SecurityView() {
  shiftStore.setTitle(TITLES.security);

  return (
    <div>
      <div className="container min-h-screen p-10 bg-black">
        <h1 className="flex justify-center mt-14 text-3xl text-white">
          security
        </h1>
        <div className="text-xl font-semibold text-white flex justify-center mt-4">
          my code : 81719
        </div>
        <div className="mt-8">
          <ShiftsInfo />
        </div>
      </div>
    </div>
  );
}
export default observer(SecurityView);
