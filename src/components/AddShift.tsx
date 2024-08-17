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

const AddShift: React.FC = () => {
  const [chosen, setChosen] = useState<string>("");
  const [lastShift, setLastShift] = useState<Shift | null>(null);

  useEffect(() => {
    getCurrentShiftApi(userStore.user.uid, chosen)
      .then((shiftItem) => {
        setLastShift(shiftItem);
        if (shiftItem && !shiftItem.finishedAt) {
          setChosen(shiftItem.title);
        }
      })
      .catch((err) => console.log(err));
  }, [chosen]);

  const startShift = async () => {
    try {
      const shiftId = await addShiftApi(userStore.user.uid, chosen);
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
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center justify-center gap-10 mt-5">
        <button
          className={`${
            chosen === TITLES.cash && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen(TITLES.cash)}
        >
          cash
        </button>
        <button
          className={`${
            chosen === TITLES.security && "bg-black text-white"
          } text-black px-3 py-2`}
          onClick={() => setChosen(TITLES.security)}
        >
          security
        </button>
      </div>
      <div className="flex justify-center items-center mt-5">
        <button
          onClick={lastShift && !lastShift.finishedAt ? endShift : startShift}
          className={`${chosen === "" ? "dis-btn" : "btn"}`}
          disabled={chosen === ""}
        >
          {lastShift && !lastShift.finishedAt ? "end shift" : "start shift"}
        </button>
      </div>
      {lastShift && !lastShift.finishedAt && (
        <div>
          total times : {timeDifference(lastShift.startedAt, new Date())}
        </div>
      )}
    </div>
  );
};

export default observer(AddShift);
