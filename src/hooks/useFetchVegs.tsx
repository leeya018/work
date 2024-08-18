import { getVegsApi } from "@/firestore/vegs/get";
import { messageStore } from "@/stores/messageStore";
import userStore from "@/stores/userStore";
import { useEffect, useState } from "react";

export default function useFetchVegs() {
  const [codes, setCodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getVegsApi(userStore.user.uid)
      .then((vegItems) => {
        setCodes(vegItems);
        messageStore.setMessage({
          type: "success",
          text: "fetch vegs succesfully",
        });
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);

        messageStore.setMessage({ type: "error", text: err.message });
      });
  }, [userStore.user]);

  return { codes, isLoading, setCodes };
}
