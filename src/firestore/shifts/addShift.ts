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

export const addShiftApi = async (userId: string, title: string) => {
  if (!userId) throw new Error("id of user not defiend");
  if (!title) throw new Error("title of work have to be defiend");
  await findUserApi(userId);

  const docRef: DocumentReference = await addDoc(collection(db, "shifts"), {
    userId,
    title,
    startedAt: new Date(),
    createdAt: new Date(),
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef.id;
};
