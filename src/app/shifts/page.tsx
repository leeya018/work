"use client";
import AddShift from "@/components/AddShift";
import Alert from "@/components/Alert";
import ProtectedRoute from "@/components/protectedRoute";
import Shifts from "@/components/Shifts";
import { getAuth, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const ShiftsPage = () => {
  const auth = getAuth();
  const [chosen, setChosen] = useState<string>("shifts");

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  return (
    <ProtectedRoute>
      <h1 className="flex justify-center mt-10 text-3xl ">my shifts</h1>
      {/* <button onClick={logoutUser} className="btn">
        logout
      </button> */}
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className={`${
            chosen === "add_shift" && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen("add_shift")}
        >
          add shift
        </button>
        <button
          className={`${
            chosen === "shifts" && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen("shifts")}
        >
          my shifts
        </button>
      </div>
      {chosen === "add_shift" && <AddShift />}
      {chosen === "shifts" && <Shifts />}
      <Alert />
      {/* <TotalSumShifts />  */}
      {/* totalShift */}
    </ProtectedRoute>
  );
};

export default observer(ShiftsPage);

// thisn i need
//  db - add shift , get shifts , updateShift ( with the end time. )
//  functions - getShiftByWorkName, getTotalHoursByName , getTotalSalarayByName,
// items to use - hook for getign the data .
//  components - Shifts , Shift , TotalSumShift( show hours and totalMoney)
// interfaces - Shift - startAt , finishAt ,
