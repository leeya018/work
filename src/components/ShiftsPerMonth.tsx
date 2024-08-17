import React, { useState } from "react";
import Shifts from "./Shifts";
import { MONTHS, YEARS } from "@/util";

const today = new Date();
const curr_m = today.getMonth() + 1;
const curr_y = today.getFullYear();

export default function ShiftsPerMonth() {
  const [chosenMonth, setChosenMonth] = useState(curr_m);
  const [chosenYear, setChosenYear] = useState(curr_y);

  const handleChangeM = (event: any) => {
    setChosenMonth(event.target.value);
  };
  const handleChangeY = (event: any) => {
    setChosenYear(event.target.value);
  };

  return (
    <div>
      {/* slects */}
      <div className="flex justify-center gap-4 mt-5">
        <select
          name="month"
          id="month"
          value={chosenMonth}
          onChange={handleChangeM}
        >
          {MONTHS.map((m_option) => (
            <option key={m_option.value} value={m_option.value}>
              {m_option.label}
            </option>
          ))}
        </select>
        <select
          name="year"
          id="year"
          value={chosenYear}
          onChange={handleChangeY}
        >
          {YEARS.map((y_option) => (
            <option key={y_option.value} value={y_option.value}>
              {y_option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Shifts month={chosenMonth} year={chosenYear} />
      </div>
    </div>
  );
}
