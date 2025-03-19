import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { messageStore } from "@/stores/messageStore";
import { timeDifference } from "@/util";
import { addShiftApi } from "@/firestore/shifts/addShift";
import userStore from "@/stores/userStore";
import { Shift } from "@/interfaces/Shift";
import { Timestamp } from "firebase/firestore";
import { shiftStore } from "@/stores/shiftStore";

const AddShift = () => {
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);

  // Load current shift from localStorage on mount
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
    if (!userStore.user?.uid) throw new Error("user id not define");
    const shift: Shift = {
      userId: userStore.user.uid,
      title: shiftStore.title,
      startedAt: Timestamp.now(),
      finishedAt: Timestamp.now(),
    };

    localStorage.setItem("curr_shift", JSON.stringify(shift));
    setCurrentShift(shift);
  };

  const endShift = async () => {
    try {
      if (!currentShift) throw new Error("Shift is not set");
      if (!userStore.user?.uid) throw new Error("user id not define");

      const shiftId = await addShiftApi(userStore.user.uid, {
        ...currentShift,
        finishedAt: Timestamp.now(),
      });

      if (!shiftId) throw new Error("Error creating a new shift");

      messageStore.setMessage({
        type: "success",
        text: "New shift added successfully!",
      });

      localStorage.removeItem("curr_shift");
      setCurrentShift(null);
    } catch (e: any) {
      messageStore.setMessage({
        type: "error",
        text: e.message || "An error occurred while ending the shift",
      });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-10 flex flex-col items-center gap-8 text-white">
      <div className="w-full flex flex-col items-center justify-center gap-4">
        {/* Start / End Shift Button */}
        <button
          onClick={currentShift ? endShift : startShift}
          disabled={shiftStore.title === ""}
          className={`w-full md:w-auto px-6 py-3 rounded-xl text-sm md:text-md font-bold transition-all duration-200 
            ${
              shiftStore.title === ""
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-yellow-600"
            }`}
        >
          {currentShift ? "End Shift" : "Start Shift"}
        </button>
      </div>

      {/* Show Total Time if Shift is Active */}
      {currentShift && (
        <div className="text-center text-md md:text-lg">
          <p>
            Total time:{" "}
            <span className="font-semibold text-yellow">
              {timeDifference(currentShift.startedAt.toDate(), new Date())}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default observer(AddShift);
