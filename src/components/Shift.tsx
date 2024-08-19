import { updateShiftsApi } from "@/firestore/shifts/updateShift";
import { Shift } from "@/interfaces/Shift";
import { messageStore } from "@/stores/messageStore";
import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { convertTime, timeDifference } from "@/util";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDownloadDone } from "react-icons/md";

type ShiftPorps = {
  shift: Shift;
};
export default function ShiftCard({ shift }: ShiftPorps) {
  const { startedAt, finishedAt } = shift;
  if (!shift) console.log("no shift in ShiftCard");
  const [canEdit, setCanEdit] = useState(false);

  const [startDate, setStartDate] = useState<Date>(startedAt?.toDate());
  const [endDate, setEndDate] = useState<Date>(finishedAt?.toDate());

  const convertDate = (date: Date) => {
    // Adjust the date to the local timezone
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);

    const formattedDateTime = localDate.toISOString().slice(0, 16);
    return formattedDateTime;
  };

  const updateShift = async () => {
    try {
      if (!shift.id) throw new Error("there is no id to shift");
      const updatedShift = await updateShiftsApi(userStore.user.uid, shift.id, {
        startedAt: Timestamp.fromDate(startDate),
        finishedAt: Timestamp.fromDate(endDate),
      });
      if (!updatedShift)
        throw new Error("there was a problem with updating the shift");
      shiftStore.updateShift(updatedShift);
      messageStore.setMessage({
        type: "success",
        text: `Shift ${shift.id} updated succesfully`,
      });
    } catch (e: any) {
      messageStore.setMessage({ type: "error", text: e.message });
    }
  };

  return (
    <div className="relative shadow-md bg-yellow p-3 rounded-xl text-lg font-medium text-black">
      <div className="absolute top-2 right-2 cursor-pointer ">
        {canEdit ? (
          <MdDownloadDone
            onClick={() => {
              setCanEdit(false);
              updateShift();
            }}
          />
        ) : (
          <FaEdit onClick={() => setCanEdit(true)} />
        )}
      </div>
      <div>
        {canEdit ? (
          <input
            type="datetime-local"
            value={convertDate(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="inp mt-5"
          />
        ) : (
          <div>start: {convertTime(startedAt)}</div>
        )}
      </div>

      {/* //end */}
      <div className="mt-2">
        {canEdit ? (
          <input
            className="inp "
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
        total: {timeDifference(startedAt.toDate(), finishedAt.toDate())}
      </div>
    </div>
  );
}
