import { deleteShiftApi } from "@/firestore/shifts/deleteShift";
import { updateShiftsApi } from "@/firestore/shifts/updateShift"; // Import deleteShiftApi

import { Shift } from "@/interfaces/Shift";
import { messageStore } from "@/stores/messageStore";
import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { convertTime, timeDifference } from "@/util";
import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import FaTrash
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

  const [showDeleteModal, setShowDeleteModal] = useState(false); // New state for modal

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
      if (!userStore.user?.uid)
        throw new Error("user id from auth is not defined");
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

  const deleteShift = async () => {
    try {
      if (!shift.id) throw new Error("there is no id to shift");
      if (!userStore.user?.uid)
        throw new Error("user id from auth is not defined");
      await deleteShiftApi(userStore.user.uid, shift.id);
      shiftStore.deleteShift(shift.id);
      messageStore.setMessage({
        type: "success",
        text: `Shift ${shift.id} deleted successfully`,
      });
    } catch (e: any) {
      messageStore.setMessage({ type: "error", text: e.message });
    }
    setShowDeleteModal(false); // Close modal after deletion (or error)
  };

  return (
    <div className="relative shadow-md bg-yellow p-3 rounded-xl text-lg font-medium text-black">
      <div className="absolute top-2 right-2 cursor-pointer flex gap-2">
        {canEdit ? (
          <>
            <MdDownloadDone
              onClick={() => {
                setCanEdit(false);
                updateShift();
              }}
            />
            <FaTrash onClick={() => setShowDeleteModal(true)} />{" "}
            {/* Open modal */}
          </>
        ) : (
          <FaEdit onClick={() => setCanEdit(true)} />
        )}
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-white w-full max-w-sm">
            <p className="text-lg mb-4">
              Are you sure you want to delete this shift?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md"
                onClick={deleteShift}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        {canEdit ? (
          <input
            type="datetime-local"
            value={convertDate(startDate)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="inp mt-5"
          />
        ) : (
          <div>{startedAt && <div>start: {convertTime(startedAt)}</div>}</div>
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
          <div>{finishedAt && <div>end: {convertTime(finishedAt)}</div>}</div>
        )}
      </div>

      <div className="mt-2">
        {" "}
        total: {timeDifference(startedAt.toDate(), finishedAt.toDate())} h
      </div>
    </div>
  );
}
