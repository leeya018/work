import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { Shift } from "@/interfaces/Shift";
import { messageStore } from "@/stores/messageStore";
import { shiftStore } from "@/stores/shiftStore";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";

export default function useFetchShifts(
  title: string,
  year: number,
  month: number
) {
  useEffect(() => {
    shiftStore.setIsLoading(true);
    if (userStore.user && title) {
      getShiftsApi(userStore.user.uid, title, year, month)
        .then((shiftsItems) => {
          shiftStore.setShifts(shiftsItems);
          messageStore.setMessage({
            type: "success",
            text: "fetch shifts succesfully",
          });
          shiftStore.setIsLoading(false);
          shiftStore.setShifts(shiftsItems);
        })
        .catch((err: any) => {
          console.log(err);
          shiftStore.setIsLoading(false);

          messageStore.setMessage({ type: "error", text: err.message });
        });
    }
  }, [userStore.user, title, year, month]);
}
