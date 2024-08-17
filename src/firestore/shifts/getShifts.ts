import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";

import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const getShiftsApi = async (
  userId: string,
  title: string
): Promise<Shift[]> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(
    collection(db, "shifts"),
    where("userId", "==", userId),
    where("title", "==", title),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const shifts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Shift[];
  return shifts;
};
