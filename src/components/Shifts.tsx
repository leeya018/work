import { timeDifferenceDuration, TITLES } from "@/util";
import React, { use, useEffect, useState } from "react";
import ShiftCard from "./Shift";
import { Shift } from "@/interfaces/Shift";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";
import { Timestamp } from "firebase/firestore";

function Shifts() {
  const [totalWage, setTotalWage] = useState(-1);
  const [totalHours, setTotalHours] = useState(-1);

  // useFetchShifts(shiftStore.title, shiftStore.year, shiftStore.month);

  useEffect(() => {
    setTotalHours(-1);
    setTotalWage(-1);
  }, [shiftStore.title, shiftStore.year, shiftStore.month]);

  // console.log(shifts);

  const calculate = () => {
    const rate = 35;
    const totalHoursT = shiftStore.shifts.reduce((acc, shift) => {
      if (!shift?.finishedAt) return 0;
      const duration = timeDifferenceDuration(
        shift.startedAt.toDate(),
        shift.finishedAt.toDate()
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
          {totalHours == -1 || totalWage == -1 ? (
            <div className="flex justify-center mt-5">
              <button className="btn" onClick={calculate}>
                calculate wage
              </button>
            </div>
          ) : (
            <div className="flex flex-col mt-5 items-center text-xl font-semibold text-white">
              <div>hours: {totalHours.toFixed(2)} Hours</div>
              <div>wage: {totalWage.toFixed(2)} Nis</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default observer(Shifts);
