import { timeDifferenceDuration, TITLES } from "@/util";
import React, { use, useEffect, useState } from "react";
import ShiftCard from "./Shift";
import { Shift } from "@/interfaces/Shift";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";
import { Timestamp } from "firebase/firestore";
import axios from "axios";

function Shifts() {
  const [totalWage, setTotalWage] = useState(-1);
  const [regularHours, setRegularHours] = useState(-1);
  const [overtime1Hours, setOvertime1Hours] = useState(-1);
  const [overtime2Hours, setOvertime2Hours] = useState(-1);

  // useFetchShifts(shiftStore.title, shiftStore.year, shiftStore.month);

  useEffect(() => {
    setRegularHours(-1);
    setOvertime1Hours(-1);
    setOvertime2Hours(-1);
    setTotalWage(-1);
  }, [shiftStore.title, shiftStore.year, shiftStore.month]);

  // console.log(shifts);

  const getDataFromGptApi = async (question: string) => {
    const res = await axios.post(
      `/api/gpt`,
      { question },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  const calculateTotalWage = (shifts: Shift[]) => {
    const hourlyWage = 35; // NIS per hour
    const busPaymentPerDay = 11; // NIS per day
    let totalWage = 0;

    let regularHoursTmp = 0;
    let overtime1HoursTmp = 0;
    let overtime2HoursTmp = 0;

    shifts.forEach((shift) => {
      const start: Date = new Date(shift.startedAt.seconds * 1000);
      const end: Date = new Date(shift.finishedAt.seconds * 1000);

      const durationInHours: number = (end - start) / (1000 * 60 * 60);

      // Regular hours (up to 8)
      const regularHours = Math.min(durationInHours, 8);
      regularHoursTmp += regularHours;
      // Overtime (next 2 hours at 125%)
      const overtime1Hours = Math.min(Math.max(durationInHours - 8, 0), 2);
      overtime1HoursTmp += overtime1Hours;

      // Overtime beyond 10 hours at 150%
      const overtime2Hours = Math.max(durationInHours - 10, 0);
      overtime2HoursTmp += overtime2Hours;

      // Calculate base pay
      let shiftPay =
        regularHours * hourlyWage +
        overtime1Hours * hourlyWage * 1.25 +
        overtime2Hours * hourlyWage * 1.5;

      // Add 11 NIS for transportation (bus payment)
      shiftPay += busPaymentPerDay;

      const dayOfWeek = start.getDay(); // 0 = Sunday, 5 = Friday, 6 = Saturday

      // If shift starts on Friday (5) or Saturday (6), apply multiplier
      if (dayOfWeek === 5) {
        shiftPay *= 1.25; // Friday is 125%
      } else if (dayOfWeek === 6) {
        shiftPay *= 1.5; // Saturday is 150%
      }

      totalWage += shiftPay;
    });
    setRegularHours(regularHoursTmp);
    setOvertime1Hours(overtime1HoursTmp);
    setOvertime2Hours(overtime2HoursTmp);
    setTotalWage(totalWage);
  };

  return (
    <div>
      {shiftStore.isLoading && shiftStore.title && (
        <div className="mt-5 text-xl font-semibold text-white flex justify-center">
          Loading ...
        </div>
      )}
      {!shiftStore.isLoading && shiftStore.shifts.length === 0 && (
        <div className="mt-5 text-md  text-white flex justify-center">
          -- No shifts --
        </div>
      )}
      {!shiftStore.isLoading && shiftStore.shifts.length > 0 && (
        <ul className="mt-5 flex flex-col gap-3">
          {shiftStore.shifts.map((shift, key) => (
            <li key={key} className="w-full px-4">
              <ShiftCard shift={shift} />
            </li>
          ))}
        </ul>
      )}
      {shiftStore.shifts.length > 0 && !shiftStore.isLoading && (
        <div>
          {regularHours == -1 || totalWage == -1 ? (
            <div className="flex justify-center mt-5">
              <button
                className="btn"
                onClick={() => calculateTotalWage(shiftStore.shifts)}
              >
                calculate wage
              </button>
            </div>
          ) : (
            <div className="flex flex-col mt-5 items-center text-xl font-semibold text-white">
              <div>hours:(100%) {regularHours.toFixed(2)} Hours</div>
              <div>hours:(125%) {overtime1Hours.toFixed(2)} Hours</div>
              <div>hours:(150%) {overtime2Hours.toFixed(2)} Hours</div>
              <div>wage: {totalWage.toFixed(2)} Nis</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default observer(Shifts);
