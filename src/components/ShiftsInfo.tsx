"use client";
import AddShift from "@/components/AddShift";
import Alert from "@/components/Alert";
import ProtectedRoute from "@/components/protectedRoute";
import Shifts from "@/components/Shifts";
import ShiftsPerMonth from "@/components/ShiftsPerMonth";
import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { Shift } from "@/interfaces/Shift";
import { messageStore } from "@/stores/messageStore";
import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { getAuth, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const ShiftsInfo = () => {
  const [chosen, setChosen] = useState<string>("add_shift");

  return (
    <div className="text-white">
      <div className="flex items-center justify-center gap-10 mt-5 text-md font-semibold text-white">
        <button
          className={`${
            chosen === "add_shift" && "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2 bg-gray-900 rounded-xl`}
          onClick={() => setChosen("add_shift")}
        >
          add shift
        </button>
        <button
          className={`${
            chosen === "last month shifts" &&
            "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2 bg-gray-900 rounded-xl`}
          onClick={() => {
            setChosen("last month shifts");
            shiftStore.resetMonth();
            shiftStore.resetYear();
          }}
        >
          last month shifts
        </button>
        <button
          className={`${
            chosen === "shifts_per_m" && "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2 bg-gray-900 rounded-xl`}
          onClick={() => setChosen("shifts_per_m")}
        >
          shifts per month
        </button>
      </div>
      {chosen === "add_shift" && <AddShift />}
      {chosen === "last month shifts" && <Shifts />}
      {chosen === "shifts_per_m" && <ShiftsPerMonth />}

      <Alert />
    </div>
  );
};

export default observer(ShiftsInfo);
