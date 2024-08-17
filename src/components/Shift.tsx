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
    <div className="p-2 border-2 rounded-md shadow-md">
      <div>start: {convertTime(shift.startedAt)}</div>
      {shift?.finishedAt && <div>end: {convertTime(shift?.finishedAt)}</div>}
      {shift?.finishedAt && (
        <div>total: {timeDifference(shift.startedAt, shift?.finishedAt)}</div>
      )}
    </div>
  );
}
