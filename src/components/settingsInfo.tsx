"use client";

import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { TITLES } from "@/util";
import { observer } from "mobx-react-lite";

import React from "react";

function settingsInfo() {
  shiftStore.setTitle(TITLES.security);

  console.log(userStore.user);
  return (
    <div>
      <div className=" pt-20 bg-black ">
        <div className="text-xl font-semibold text-white flex justify-center mt-2">
          my code : {userStore.user?.employeeNumber}
        </div>
      </div>
    </div>
  );
}
export default observer(settingsInfo);
