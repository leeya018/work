import React, { useState } from "react";
import Shifts from "./Shifts";
import { MONTHS, YEARS } from "@/util";
import { title } from "process";
import Select from "@/ui/Select";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";

function ShiftsPerMonth() {
  return (
    <div>
      {/* slects */}
      <div className="flex justify-center gap-4 mt-5">
        <Select
          options={MONTHS}
          onChange={(e: any) => shiftStore.setMonth(e.target.value)}
          name="month"
          id="month"
          value={shiftStore.month}
        />
        <Select
          name="year"
          id="year"
          value={shiftStore.year}
          onChange={(e: any) => shiftStore.setYear(e.target.value)}
          options={YEARS}
        />
      </div>

      <div>
        <Shifts />
      </div>
    </div>
  );
}

export default observer(ShiftsPerMonth);
