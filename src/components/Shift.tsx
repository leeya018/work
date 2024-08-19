import { updateShiftsApi } from "@/firestore/shifts/updateShift";
import { Shift } from "@/interfaces/Shift";
import userStore from "@/stores/userStore";
import { convertTime, timeDifference } from "@/util";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

type ShiftPorps = {
  shift: Shift;
};
export default function ShiftCard({ shift }: ShiftPorps) {
  const { startedAt, finishedAt } = shift;

  const [canEdit, setCanEdit] = useState(false);

  const [startDate, setStartDate] = useState<Date>(startedAt.toDate());
  const [endDate, setEndDate] = useState<Date>(finishedAt.toDate());

  const convertDate = (date: Date) => {
    // Adjust the date to the local timezone
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);

    const formattedDateTime = localDate.toISOString().slice(0, 16);
    return formattedDateTime;
  };

  return (
    <div className="relative shadow-md bg-yellow p-3 rounded-xl text-lg font-medium text-black">
      <div
        className="absolute top-2 right-2 cursor-pointer "
        onClick={() =>
          setCanEdit((prev) => {
            if (prev) {
              // updaet the data
              try {
                if (!shift.id) throw new Error("there is no id to shift");
                updateShiftsApi(userStore.user.uid, shift.id, {
                  startedAt: Timestamp.fromDate(startDate),
                  finishedAt: Timestamp.fromDate(endDate),
                });
              } catch (error) {
                console.log(error);
              }
            }
            return !prev;
          })
        }
      >
        <FaEdit />
      </div>
      <div>
        {canEdit ? (
          <input
            type="datetime-local"
            value={convertDate(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        ) : (
          <div>start: {convertTime(startedAt)}</div>
        )}
      </div>

      {/* //end */}
      <div className="mt-2">
        {canEdit ? (
          <input
            type="datetime-local"
            value={convertDate(endDate)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        ) : (
          <div>end: {convertTime(finishedAt)}</div>
        )}
      </div>

      <div className="mt-2">
        {" "}
        total: {timeDifference(startedAt, finishedAt)}
      </div>
    </div>
  );
}
