import { Timestamp } from "firebase/firestore";

export type Shift = {
  id?: string;
  title: string;
  startedAt: Timestamp;
  finishedAt?: Timestamp;
  createdAt?: Timestamp;
};
