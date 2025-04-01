import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ShiftCard from "./Shift";
import { shiftStore } from "@/stores/shiftStore";
import { calculateShifts } from "@/util";
import WageCalculation from "./WageCalculation";

function Shifts() {
  const [totalWage, setTotalWage] = useState(-1);
  const [regularHours, setRegularHours] = useState(-1);
  const [overtime1Hours, setOvertime1Hours] = useState(-1);
  const [overtime2Hours, setOvertime2Hours] = useState(-1);

  useEffect(() => {
    setRegularHours(-1);
    setOvertime1Hours(-1);
    setOvertime2Hours(-1);
    setTotalWage(-1);
  }, [shiftStore.title, shiftStore.year, shiftStore.month]);

  const calculate = () => {
    const {
      totalRegularHours,
      totalOvertime1Hours,
      totalOvertime2Hours,
      totalWage,
    } = calculateShifts(shiftStore.shifts);

    setRegularHours(totalRegularHours);
    setOvertime1Hours(totalOvertime1Hours);
    setOvertime2Hours(totalOvertime2Hours);
    setTotalWage(totalWage);
  };

  return (
    <div className="w-full   px-4 py-2 flex flex-col">
      {/* Loading State */}
      {shiftStore.isLoading && shiftStore.title && (
        <div className="text-white text-xl font-semibold text-center mt-10">
          Loading...
        </div>
      )}

      {/* No Shifts */}
      {!shiftStore.isLoading && shiftStore.shifts.length === 0 && (
        <div className="text-white text-md text-center mt-10">
          -- No shifts --
        </div>
      )}

      {/* Wage Calculation Section */}
      {shiftStore.shifts.length > 0 && !shiftStore.isLoading && (
        <WageCalculation
          totalWage={totalWage}
          regularHours={regularHours}
          overtime1Hours={overtime1Hours}
          overtime2Hours={overtime2Hours}
          calculate={calculate}
        />
      )}

      {/* Shifts List */}
      {!shiftStore.isLoading && shiftStore.shifts.length > 0 && (
        <div className="w-full  mx-auto px-4 py-8">
          <div
            className="h-[60vh]  overflow-y-auto
           scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900"
          >
            <ul className="flex flex-col gap-4 pr-2">
              {shiftStore.shifts.map((shift, key) => (
                <li key={key} className="w-full px-2 md:px-4">
                  <ShiftCard shift={shift} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default observer(Shifts);
