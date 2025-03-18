import { db } from "@/firebase";
import { User } from "@/interfaces/User";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

/**
 * Fetches user data from Firestore by user UID
 * @param userId - UID of the user
 */
export const getUserApi = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    return null; // or throw an error if you prefer
  }

  return { id: userSnap.id, ...(userSnap.data() as User) };
};

/**
 * Adds a new user to Firestore if they don't exist
 * @param user - User object
 */
export const addUserApi = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    console.warn(`User with uid ${user.uid} already exists.`);
    return; // or return existing user
  }

  await setDoc(userRef, {
    uid: user.uid,
    email: user.email,
    role: "user",
    displayName: user.displayName,
    photoURL: user.photoURL,
    startedAt: new Date(),
    lessons: [],
  });

  return { id: userRef.id, ...(user as User) };
};

/**
 * Updates an existing user in Firestore
 * @param userId - UID of the user
 * @param data - Fields to update
 */
export const updateUserApi = async (userId: string, data: Partial<User>) => {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    throw new Error(`User with uid ${userId} does not exist.`);
  }

  await updateDoc(userRef, data);

  // Return updated user data (optional)
  const updatedUserSnap = await getDoc(userRef);
  return { id: updatedUserSnap.id, ...(updatedUserSnap.data() as User) };
};

export const findUserApi = async (userId: string) => {
  // Reference to the user's document in Firestore
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  // If user does not exist in Firestore, add them
  if (!userSnap.exists()) throw new Error("user is not exists");

  // Fetch and return the user data
  const userData = await getDoc(userRef);
  return { id: userData.id, ...(userData.data() as User) };
};
