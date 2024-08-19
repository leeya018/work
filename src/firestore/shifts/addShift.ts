import { db } from "@/firebase";
import { Shift } from "@/interfaces/Shift";
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { findUserApi } from "../user/findUser";
import { finished } from "stream";

export const addShiftApi = async (userId: string, info: Shift) => {
  if (!userId) throw new Error("id of user not defiend");
  const { title, startedAt, finishedAt } = info;
  if (!title) throw new Error("title of work have to be defiend");
  await findUserApi(userId);

  const docRef: DocumentReference = await addDoc(collection(db, "shifts"), {
    userId,
    title,
    startedAt,
    finishedAt,
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
