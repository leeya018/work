import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { findUserApi } from "../user/findUser";

export const updateShiftsApi = async (
  userId: string,
  docId: string,
  info: any
): Promise<void> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);
  const shiftRef = doc(db, "shifts", docId);
  await updateDoc(shiftRef, {
    ...info,
  });
  console.log(`docId ${docId} updated successfully.`);
};
