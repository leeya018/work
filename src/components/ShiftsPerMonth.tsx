import React, { useState } from "react";
import Shifts from "./Shifts";
import { MONTHS, YEARS } from "@/util";
import { title } from "process";
import Select from "@/ui/Select";

const today = new Date();
const curr_m = today.getMonth() + 1;
const curr_y = today.getFullYear();

type ShiftsPerMonthProps = {
  title: string;
};
export default function ShiftsPerMonth({ title }: ShiftsPerMonthProps) {
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
        <Select
          options={MONTHS}
          onChange={handleChangeM}
          name="month"
          id="month"
          value={chosenMonth}
        />
        <Select
          name="year"
          id="year"
          value={chosenYear}
          onChange={handleChangeY}
          options={YEARS}
        />
      </div>

      <div>
        <Shifts title={title} month={chosenMonth} year={chosenYear} />
      </div>
    </div>
  );
}
