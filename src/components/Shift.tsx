import { Shift } from "@/interfaces/Shift";
import { convertTime, timeDifference } from "@/util";
import React from "react";

type ShiftPorps = {
  shift: Shift;
};
export default function ShiftCard({ shift }: ShiftPorps) {
  console.log(shift);
  console.log(shift);
  return (
    <div className=" shadow-md bg-yellow p-3 rounded-xl text-lg font-medium text-black">
      <div>start: {convertTime(shift.startedAt)}</div>
      {shift?.finishedAt && <div>end: {convertTime(shift?.finishedAt)}</div>}
      {shift?.finishedAt && (
        <div>total: {timeDifference(shift.startedAt, shift?.finishedAt)}</div>
      )}
    </div>
  );
}
