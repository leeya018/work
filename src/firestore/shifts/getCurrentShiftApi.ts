import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const getCurrentShiftApi = async (
  userId: string,
  title: string
): Promise<Shift | null> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(
    collection(db, "shifts"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { ...doc.data(), id: doc.id } as Shift;
  }
  return null;
};
