import useFetchShifts from "@/hooks/useFetchShifts";
import { TITLES } from "@/util";
import React, { useState } from "react";
import ShiftCard from "./Shift";

export default function Shifts() {
  const [chosen, setChosen] = useState<string>("");
  const { isLoading, shifts } = useFetchShifts(chosen);
  console.log(shifts);
  return (
    <div>
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className={`${
            chosen === TITLES.cash && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen(TITLES.cash)}
        >
          cash
        </button>
        <button
          className={`${
            chosen === TITLES.security && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen(TITLES.security)}
        >
          security
        </button>
      </div>
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
