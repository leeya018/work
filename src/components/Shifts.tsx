import useFetchShifts from "@/hooks/useFetchShifts";
import { TITLES } from "@/util";
import React, { useState } from "react";
import ShiftCard from "./Shift";

type ShiftsProps = {
  title: string;
  year: number;
  month: number;
};
export default function Shifts({ title, year, month }: ShiftsProps) {
  const { isLoading, shifts } = useFetchShifts(title, year, month);
  console.log(shifts);
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
    </div>
  );
}
