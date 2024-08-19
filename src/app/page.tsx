"use client";
import React, { useState } from "react";
import Link from "next/link";
import ProtectedRoute from "@/components/protectedRoute";
import Image from "next/image";
import userStore from "@/stores/userStore";
import Header from "@/components/Header";
import { useRouter } from "next/navigation";
import {
  curr_m,
  curr_y,
  getDbUrl,
  githubUrl,
  netlifyUrl,
  timeDifferenceDuration,
} from "@/util";
import { shiftStore } from "@/stores/shiftStore";
import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { messageStore } from "@/stores/messageStore";
import { Shift } from "@/interfaces/Shift";
import { observer } from "mobx-react-lite";

function HomePage() {
  // const [billsAmounts, setAmounts] = useState<number[]>(Array(bills.length).fill(0));
  const router = useRouter();
  const [totalWage, setTotalWage] = useState(-1);
  const [totalHours, setTotalHours] = useState(-1);

  const calculate = async () => {
    try {
      console.log("start");
      const shifts: Shift[] = await getShiftsApi(
        userStore.user.uid,
        "",
        curr_y,
        curr_m
      );
      messageStore.setMessage({
        type: "success",
        text: `Fetch all shifts of month successufly`,
      });
      const rate = 35;
      const totalHoursT = shifts.reduce((acc, shift) => {
        if (!shift?.finishedAt) return 0;
        const duration = timeDifferenceDuration(
          shift.startedAt.toDate(),
          shift.finishedAt.toDate()
        );
        return acc + duration.asHours();
      }, 0);
      // console.log({ totalHours });
      console.log(`${rate} * ${totalHoursT}`);
      const wageT = rate * totalHoursT;
      console.log({ totalHoursT, wageT });
      setTotalWage(wageT);
      setTotalHours(totalHoursT);
    } catch (error: any) {
      console.log(error.message);
      messageStore.setMessage({ type: "error", text: error.message });
    }
  };
  return (
    <ProtectedRoute>
      <div className="container h-screen p-10 bg-black text-white flex flex-col">
        {/* header */}
        <Header />
        <h1 className="flex justify-center mt-14 text-3xl text-white">Menu</h1>
        <ul className="flex flex-col gap-5  mt-10 text-xl text-black font-semibold">
          <li
            className=" bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/security")}
          >
            <span>Secrurity</span>
          </li>
          <li
            className="bg-yellow p-5 rounded-xl"
            onClick={() => router.push("/cash")}
          >
            <span>Cash</span>
          </li>
        </ul>
        <div className="mt-5 flex flex-col items-center">
          <button className="btn" onClick={calculate}>
            calc wage
          </button>
          {totalHours !== -1 && (
            <div className="flex flex-col mt-5 items-center text-xl font-medium text-white">
              <div>hours: {totalHours.toFixed(2)} Hours</div>
              <div>wage: {totalWage.toFixed(2)} Nis</div>
            </div>
          )}
        </div>
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
export default observer(HomePage);
