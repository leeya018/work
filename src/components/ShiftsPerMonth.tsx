import React from "react";
import Shifts from "./Shifts";
import { MONTHS, YEARS } from "@/util";
import Select from "@/ui/Select";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";

function ShiftsPerMonth() {
  return (
    <div className="w-full h-full max-w-5xl mx-auto  pt-5">
      {/* Filters Section */}
      <div
        className="flex flex-row justify-center 
      items-center gap-4 md:gap-8"
      >
        <Select
          options={MONTHS}
          onChange={(e: any) => shiftStore.setMonth(e.target.value)}
          name="month"
          id="month"
          value={shiftStore.month}
        />
        <Select
          options={YEARS}
          onChange={(e: any) => shiftStore.setYear(e.target.value)}
          name="year"
          id="year"
          value={shiftStore.year}
        />
      </div>

      {/* Shifts List */}
      <Shifts />
    </div>
  );
}

export default observer(ShiftsPerMonth);
