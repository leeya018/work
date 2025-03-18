"use client";

import Header from "@/components/Header";
import ProtectedRoute from "@/components/protectedRoute";
import { useUser } from "@/hooks/useUser";
import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { TITLES } from "@/util";
import { getAuth } from "firebase/auth";
import { observer } from "mobx-react-lite";

import React, { useEffect } from "react";

function settingsInfo() {
  shiftStore.setTitle(TITLES.security);

  console.log(userStore.user);
  return (
    <div>
      <div className=" p-10 bg-black">
        <h1 className="flex justify-center mt-14 text-3xl text-white">
          security
        </h1>
        <div className="text-xl font-semibold text-white flex justify-center mt-4">
          my code : {userStore.user?.employeeNumber}
        </div>
      </div>
    </div>
  );
}
export default observer(settingsInfo);
