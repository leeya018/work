import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";

import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const getVegsApi = async (userId: string): Promise<any[]> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);

  const q = query(
    collection(db, "vegs"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  const vegs = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as any[];
  return vegs;
};
//

// mother - from the aparmetn the choose flip  ( happend with he other aparmmetn , in seconds and miinuts)
// change the opinion with doctor all time - Eden Exmaple 1 h
// want to decide and not flip my mind
