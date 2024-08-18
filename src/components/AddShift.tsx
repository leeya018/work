// components/MessageList.tsx
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "@/stores/messageStore";
import { timeDifference, TITLES } from "@/util";
import { addShiftApi } from "@/firestore/shifts/addShift";
import userStore from "@/stores/userStore";
import { getCurrentShiftApi } from "@/firestore/shifts/getCurrentShiftApi";
import { Shift } from "@/interfaces/Shift";
import { updateShiftsApi } from "@/firestore/shifts/updateShift";
type AddShiftProps = {
  title: string;
};
const AddShift = ({ title }: AddShiftProps) => {
  const [lastShift, setLastShift] = useState<Shift | null>(null);

  useEffect(() => {
    getCurrentShiftApi(userStore.user.uid, title)
      .then((shiftItem) => {
        setLastShift(shiftItem);
      })
      .catch((err) => console.log(err));
  }, []);

  const startShift = async () => {
    try {
      const shiftId = await addShiftApi(userStore.user.uid, title);
      if (!shiftId) throw new Error("error with create a new shift");
      messageStore.setMessage({
        type: "success",
        text: "new Shift added succesfully",
      });
    } catch (e: any) {
      messageStore.setMessage({ type: "error", text: e.message });
    }
  };
  const endShift = async () => {
    try {
      if (!lastShift?.id) throw new Error("id of last shift not exsits");
      await updateShiftsApi(userStore.user.uid, lastShift.id);
      messageStore.setMessage({
        type: "success",
        text: "ended shift succesfully",
      });
    } catch (e: any) {
      messageStore.setMessage({ type: "error", text: e.message });
    }
  };

  console.log(lastShift);
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={lastShift && !lastShift.finishedAt ? endShift : startShift}
          className={`${title === "" ? "dis-btn" : "btn"}`}
          disabled={title === ""}
        >
          {lastShift && !lastShift.finishedAt ? "end shift" : "start shift"}
        </button>
      </div>
      {lastShift && !lastShift.finishedAt && (
        <div>
          total time : {timeDifference(lastShift.startedAt, new Date())}
        </div>
      )}
    </div>
  );
};

export default observer(AddShift);
