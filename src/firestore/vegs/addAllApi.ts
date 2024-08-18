// firebaseUtils.ts

import { db } from "@/firebase";
import {
  collection,
  addDoc,
  DocumentSnapshot,
  getDoc,
  writeBatch,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const addAllApi = async (items: any[]): Promise<void> => {
  const batch = writeBatch(db);
  const colRef = collection(db, "vegs");

  items.forEach((item) => {
    const newItem = { ...item, createdAt: serverTimestamp() };
    const docRef = doc(colRef); // Generate a new document reference with an auto-generated ID
    batch.set(docRef, newItem);
  });

  await batch.commit();
};
