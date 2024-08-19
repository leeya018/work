import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { findUserApi } from "../user/findUser";
import { Shift } from "@/interfaces/Shift";

export const updateShiftsApi = async (
  userId: string,
  docId: string,
  info: any
): Promise<Shift | null> => {
  if (!userId) throw new Error("id of user not defiend");
  await findUserApi(userId);
  const shiftRef = doc(db, "shifts", docId);
  await updateDoc(shiftRef, {
    ...info,
  });
  console.log(`docId ${docId} updated successfully.`);
  // Retrieve the updated document
  const updatedDoc = await getDoc(shiftRef);
  return { ...(updatedDoc.data() as Shift), id: updatedDoc.id };
};
