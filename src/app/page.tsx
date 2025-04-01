"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute";
import userStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import {
  calculateShifts,
  curr_m,
  curr_y,
  getDbUrl,
  githubUrl,
  netlifyUrl,
} from "@/util";
import { shiftStore } from "@/stores/shiftStore";
import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { messageStore } from "@/stores/messageStore";
import { Shift } from "@/interfaces/Shift";
import { observer } from "mobx-react-lite";
import WageCalculation from "@/components/WageCalculation";

function HomeView() {
  const [totalWage, setTotalWage] = useState(-1);
  const [regularHours, setRegularHours] = useState(-1);
  const [overtime1Hours, setOvertime1Hours] = useState(-1);
  const [overtime2Hours, setOvertime2Hours] = useState(-1);

  const router = useRouter();

  const calculate = async () => {
    try {
      if (!userStore.user?.uid) throw new Error("No user ID found");

      console.log("Starting shift calculation...");
      shiftStore.setIsLoading(true);
      const shifts: Shift[] = await getShiftsApi(
        userStore.user?.uid,
        "",
        curr_y,
        curr_m
      );

      messageStore.setMessage({
        type: "success",
        text: `Fetched all shifts for month successfully!`,
      });
      const {
        totalRegularHours,
        totalOvertime1Hours,
        totalOvertime2Hours,
        totalWage,
      } = calculateShifts(shifts);
      setTotalWage(totalWage);

      console.log({
        totalRegularHours,
        totalOvertime1Hours,
        totalOvertime2Hours,
        totalWage,
      });
      setRegularHours(totalRegularHours);
      setOvertime1Hours(totalOvertime1Hours);
      setOvertime2Hours(totalOvertime2Hours);
      setTotalWage(totalWage);
      // setTotalHours(
      //   totalRegularHours + totalOvertime1Hours + totalOvertime2Hours
      // );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.message);
      messageStore.setMessage({ type: "error", text: error.message });
    } finally {
      shiftStore.setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container h-screen w-screen p-10 bg-black text-white flex flex-col">
        <h1 className="flex justify-center mt-14 text-3xl text-white">Menu</h1>
        <ul className="flex flex-col gap-5  mt-10 text-xl text-black font-semibold">
          <li
            className=" bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/shifts")}
          >
            <span>security shifts</span>
          </li>
          <li
            className="bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/settings")}
          >
            <span>settings</span>
          </li>
        </ul>

        <WageCalculation
          totalWage={totalWage}
          regularHours={regularHours}
          overtime1Hours={overtime1Hours}
          overtime2Hours={overtime2Hours}
          calculate={calculate}
        />
        {userStore.user?.uid === process.env.NEXT_PUBLIC_USER_OWNER_ID && (
          <div className=" text-md underline flex flex-col gap-3 items-center mt-auto">
            <Link href={getDbUrl()} target="_blank">
              <span>Firbase DB</span>
            </Link>
            <Link href={netlifyUrl} target="_blank">
              <span>Netlify</span>
            </Link>
            <Link href={githubUrl} target="_blank">
              <span>Github</span>
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
export default observer(HomeView);
