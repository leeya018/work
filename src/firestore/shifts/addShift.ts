import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";
import { DocumentReference, addDoc, collection } from "firebase/firestore";

import { TITLES } from "@/util";
import { findUserApi } from "../user/userDB";

export const addShiftApi = async (userId: string, info: Shift) => {
  if (!userId) throw new Error("id of user not defiend");
  const { startedAt, finishedAt } = info;
  // if (!title) throw new Error("title of work have to be defiend");
  await findUserApi(userId);

  const docRef: DocumentReference = await addDoc(collection(db, "shifts"), {
    userId,
    title: TITLES.security,
    startedAt,
    finishedAt,
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
