"use client";
import AddShift from "@/components/AddShift";
import Alert from "@/components/Alert";
import ProtectedRoute from "@/components/protectedRoute";
import Shifts from "@/components/Shifts";
import ShiftsPerMonth from "@/components/ShiftsPerMonth";
import { getAuth, signOut } from "firebase/auth";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const today = new Date();
const curr_m = today.getMonth() + 1;
const curr_y = today.getFullYear();

type ShiftsInfoProps = {
  title: string;
};
const ShiftsInfo = ({ title }: ShiftsInfoProps) => {
  const auth = getAuth();
  const [chosen, setChosen] = useState<string>("shifts_per_m");

  const logoutUser = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
      throw error;
    }
  };

  return (
    <div>
      <h1 className="flex justify-center mt-10 text-3xl ">my shifts</h1>
      {/* <button onClick={logoutUser} className="btn">
        logout
      </button> */}
      <div className="flex items-center justify-center gap-10 mt-5 text-md font-semibold text-white">
        <button
          className={`${
            chosen === "add_shift" && "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2`}
          onClick={() => setChosen("add_shift")}
        >
          add shift
        </button>
        <button
          className={`${
            chosen === "shifts" && "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2`}
          onClick={() => setChosen("shifts")}
        >
          my shifts
        </button>
        <button
          className={`${
            chosen === "shifts_per_m" && "bg-yellow p-5 rounded-xl text-black"
          }  px-3 py-2`}
          onClick={() => setChosen("shifts_per_m")}
        >
          shifts per month
        </button>
      </div>
      {chosen === "add_shift" && <AddShift title={title} />}
      {chosen === "shifts" && (
        <Shifts title={title} month={curr_m} year={curr_y} />
      )}
      {chosen === "shifts_per_m" && <ShiftsPerMonth title={title} />}
      {/* <ShiftSum />  */}
      <Alert />
      {/* <TotalSumShifts />  */}
      {/* totalShift */}
    </div>
  );
};

export default observer(ShiftsInfo);

// thisn i need
//  db - add shift , get shifts , updateShift ( with the end time. )
//  functions - getShiftByWorkName, getTotalHoursByName , getTotalSalarayByName,
// items to use - hook for getign the data .
//  components - Shifts , Shift , TotalSumShift( show hours and totalMoney)
// interfaces - Shift - startAt , finishAt ,
