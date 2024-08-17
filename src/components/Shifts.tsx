import useFetchShifts from "@/hooks/useFetchShifts";
import { timeDifferenceDuration, TITLES } from "@/util";
import React, { use, useEffect, useState } from "react";
import ShiftCard from "./Shift";

type ShiftsProps = {
  title: string;
  year: number;
  month: number;
};
export default function Shifts({ title, year, month }: ShiftsProps) {
  const { isLoading, shifts } = useFetchShifts(title, year, month);
  const [totalWage, setTotalWage] = useState(-1);
  const [totalHours, setTotalHours] = useState(-1);

  useEffect(() => {
    setTotalHours(-1);
    setTotalWage(-1);
  }, [title, year, month]);

  console.log(shifts);

  const calculate = () => {
    const rate = 35;
    const totalHoursT = shifts.reduce((acc, shift) => {
      if (!shift?.finishedAt) return 0;
      const duration = timeDifferenceDuration(
        shift.startedAt,
        shift.finishedAt
      );
      return acc + duration.asHours();
    }, 0);
    // console.log({ totalHours });
    const wageT = rate * totalHoursT;
    console.log({ totalHoursT, wageT });
    setTotalWage(wageT);
    setTotalHours(totalHoursT);
  };
  return (
    <div>
      {isLoading && title && (
        <div className="mt-5 text-xl font-bold text-black flex justify-center">
          Loading ...
        </div>
      )}
      {!isLoading && shifts.length === 0 && (
        <div className="mt-5 text-md  text-black flex justify-center">
          -- No shifts --
        </div>
      )}
      <ul className="mt-5 flex flex-col gap-3">
        {shifts.map((shift, key) => (
          <li key={key} className="w-full px-4">
            <ShiftCard shift={shift} />
          </li>
        ))}
      </ul>
      {shifts.length > 0 && (
        <div>
          {totalHours == -1 || totalWage == -1 ? (
            <div className="flex justify-center mt-5">
              <button className="btn" onClick={calculate}>
                calculate wage
              </button>
            </div>
          ) : (
            <div className="flex flex-col mt-5 items-center text-xl font-semibold">
              <div>hours: {totalHours.toFixed(2)} Hours</div>
              <div>wage: {totalWage.toFixed(2)} Nis</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
