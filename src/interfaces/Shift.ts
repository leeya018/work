import { Timestamp } from "firebase/firestore";

export type Shift = {
  userId: string;
  id?: string;
  title: string;
  startedAt: Timestamp;
  finishedAt: Timestamp;
};
