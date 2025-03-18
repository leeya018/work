import { timeDifferenceDuration, TITLES } from "@/util";
import React, { use, useEffect, useState } from "react";
import ShiftCard from "./Shift";
import { Shift } from "@/interfaces/Shift";
import { shiftStore } from "@/stores/shiftStore";
import { observer } from "mobx-react-lite";
import { Timestamp } from "firebase/firestore";
import axios from "axios";

function Shifts() {
  const [totalWage, setTotalWage] = useState(-1);
  const [totalHours, setTotalHours] = useState(-1);

  // useFetchShifts(shiftStore.title, shiftStore.year, shiftStore.month);

  useEffect(() => {
    setTotalHours(-1);
    setTotalWage(-1);
  }, [shiftStore.title, shiftStore.year, shiftStore.month]);

  // console.log(shifts);

  const getDataFromGptApi = async (question: string) => {
    const res = await axios.post(
      `/api/gpt`,
      { question },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  };

  // const calculate = () => {
  //   const rate = 35;
  //   const driveRate = 11;
  //   const totalForDrive = driveRate * shiftStore.shifts.length;
  //   const totalHoursT = shiftStore.shifts.reduce((acc, shift) => {
  //     if (!shift?.finishedAt) return 0;
  //     const duration = timeDifferenceDuration(
  //       shift.startedAt.toDate(),
  //       shift.finishedAt.toDate()
  //     );
  //     return acc + duration.asHours();
  //   }, 0);
  //   // console.log({ totalHours });
  //   const wageT = rate * totalHoursT + totalForDrive;
  //   console.log({ totalHoursT, wageT });
  //   setTotalWage(wageT);
  //   setTotalHours(totalHoursT);
  // };

  const calculate = async () => {
    const prompt = `I am in Israel and I want to calutlate the wage that I need to get. knowing that the wage is 35 Nis per 
      hour and they pay us 11 Nis for each day that we are working
       ( that for the bus ). I want you to consider the law in Israel and calculate the salary according to holidays , friday , 
        saturady and the extra hours. in the end, I want you to send me the total wage that I need to get for my work 
        .the shifts are: ${JSON.stringify(
          shiftStore.shifts.map((shift) => ({
            startedAt: shift.startedAt,
            finishedAt: shift.finishedAt,
          }))
        )} ( when you return the answer ,
         return it as a number so that completion.choices[0].message.content value will be a number )`;

    console.log(prompt);
    const totalHoursT = shiftStore.shifts.reduce((acc, shift) => {
      if (!shift?.finishedAt) return 0;
      const duration = timeDifferenceDuration(
        shift.startedAt.toDate(),
        shift.finishedAt.toDate()
      );
      return acc + duration.asHours();
    }, 0);
    // console.log({ totalHours });

    const wage = await getDataFromGptApi(prompt);

    console.log({ totalHoursT, wage });
    setTotalWage(wage);
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
