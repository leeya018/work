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
import { Timestamp } from "firebase/firestore";
type AddShiftProps = {
  title: string;
};

// const date123 = Timestamp.now();
const AddShift = ({ title }: AddShiftProps) => {
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  // useEffect(() => {
  //   getCurrentShiftApi(userStore.user.uid, title)
  //     .then((shiftItem) => {
  //       setLastShift(shiftItem);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  useEffect(() => {
    const localShiftStr = localStorage.getItem("curr_shift");
    if (localShiftStr) {
      const myShift = JSON.parse(localShiftStr);
      const { seconds, nanoseconds } = myShift.startedAt;
      myShift.startedAt = new Timestamp(seconds, nanoseconds);
      setCurrentShift(myShift);
    }
  }, []);

  const startShift = async () => {
    const shift = {
      title,
      startedAt: Timestamp.now(),
    };
    localStorage.setItem("curr_shift", JSON.stringify(shift));
  };
  // console.log({ currentShift });
  const endShift = async () => {
    try {
      if (!currentShift) throw new Error("shift is not set");
      const shiftId = await addShiftApi(userStore.user.uid, {
        ...currentShift,
        finishedAt: Timestamp.now(),
      });
      if (!shiftId) throw new Error("error with create a new shift");
      messageStore.setMessage({
        type: "success",
        text: "new Shift added succesfully",
      });
      localStorage.removeItem("curr_shift");
      setCurrentShift(null);
    } catch (e: any) {
      messageStore.setMessage({ type: "error", text: e.message });
    }
  };

  console.log(currentShift);
  return (
    <div className="flex flex-col items-center gap-5 text-white">
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={currentShift ? endShift : startShift}
          className={`${title === "" ? "dis-btn" : "btn"}`}
          disabled={title === ""}
        >
          {currentShift ? "end shift" : "start shift"}
        </button>
      </div>
      {currentShift && (
        <div>
          {/* total time : {timeDifference(date123, new Date())} */}
          total time : {timeDifference(currentShift.startedAt, new Date())}
        </div>
      )}
    </div>
  );
};

export default observer(AddShift);
