import { getShiftsApi } from "@/firestore/shifts/getShifts";
import { Shift } from "@/interfaces/Shift";
import { messageStore } from "@/stores/messageStore";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";

export default function useFetchShifts(
  title: string,
  year: number,
  month: number
) {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userStore.user && title) {
      getShiftsApi(userStore.user.uid, title, year, month)
        .then((shiftsItems) => {
          setShifts(shiftsItems);
          messageStore.setMessage({
            type: "success",
            text: "fetch shifts succesfully",
          });
          setIsLoading(false);
        })
        .catch((err: any) => {
          console.log(err);
          messageStore.setMessage({ type: "error", text: err.message });
        });
    }
  }, [userStore.user, title, year, month]);

  return { shifts, isLoading };
}
