import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";

import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const getSalaryPerMonth = async (
  userId: string,
  title: string,
  year: number,
  month: number
): Promise<Shift[]> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  // Get the start and end of the month
  const startOfMonth = new Date(year, month - 1, 1);
  const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

  // Convert to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(startOfMonth);
  const endTimestamp = Timestamp.fromDate(endOfMonth);

  const q = query(
    collection(db, "shifts"),
    where("userId", "==", userId),
    where("title", "==", title),
    where("startedAt", ">=", startTimestamp),
    where("startedAt", "<=", endTimestamp)
  );
  const querySnapshot = await getDocs(q);
  const shifts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Shift[];
  return shifts;
};
