"use client";
import AddShift from "@/components/AddShift";
import Alert from "@/components/Alert";
import ProtectedRoute from "@/components/protectedRoute";
import Shifts from "@/components/Shifts";
import { getAuth, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React from "react";

const ShiftsPage = () => {
  const auth = getAuth();

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
      <AddShift />
      <Shifts />
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
