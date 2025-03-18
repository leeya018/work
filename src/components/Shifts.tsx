import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import ShiftCard from "./Shift";
import { Shift } from "@/interfaces/Shift";
import { shiftStore } from "@/stores/shiftStore";
import { calculateShifts } from "@/util";

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

  const calculateTotalWage = (shifts: Shift[]) => {
    const {
      totalRegularHours,
      totalOvertime1Hours,
      totalOvertime2Hours,
      totalWage,
    } = calculateShifts(shifts);

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

      {/* Shifts List */}
      {!shiftStore.isLoading && shiftStore.shifts.length > 0 && (
        <div className="w-full  mx-auto px-4 py-8">
          <div className="h-[400px] md:h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
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

      {/* Wage Calculation Section */}
      {shiftStore.shifts.length > 0 && !shiftStore.isLoading && (
        <div className="flex flex-col items-center gap-6 mt-6">
          {regularHours === -1 || totalWage === -1 ? (
            <button
              className="bg-white text-black font-bold text-md px-6 py-3 rounded-xl w-full md:w-auto hover:bg-yellow-600 transition-all"
              onClick={() => calculateTotalWage(shiftStore.shifts)}
            >
              Calculate Wage
            </button>
          ) : (
            <div className="flex flex-col gap-4 text-white text-lg md:text-xl font-semibold items-center text-center">
              <div>
                Regular Hours (100%):{" "}
                <span className="text-yellow">
                  {regularHours.toFixed(2)} hrs
                </span>
              </div>
              <div>
                Overtime 1 (125%):{" "}
                <span className="text-yellow">
                  {overtime1Hours.toFixed(2)} hrs
                </span>
              </div>
              <div>
                Overtime 2 (150%):{" "}
                <span className="text-yellow">
                  {overtime2Hours.toFixed(2)} hrs
                </span>
              </div>
              <div className="text-2xl font-bold mt-4">
                Total Wage:{" "}
                <span className="text-green-400">
                  {totalWage.toFixed(2)} NIS
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default observer(Shifts);
