// firestore/shifts/deleteShift.ts

import { db } from "@/firebase";
import { doc, deleteDoc } from "firebase/firestore";

import { findUserApi } from "../user/userDB";

export const deleteShiftApi = async (
  userId: string,
  docId: string
): Promise<void> => {
  if (!userId) throw new Error("id of user not defined");
  await findUserApi(userId); // Ensure user exists before deleting shift
  const shiftRef = doc(db, "shifts", docId);
  await deleteDoc(shiftRef);
  console.log(`docId ${docId} deleted successfully.`);
};
