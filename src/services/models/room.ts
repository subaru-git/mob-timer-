import { firestore } from 'firebase/app';

export type Room = {
  id?: string;
  name: string;
  timer: number;
  breaks: number;
  breaksCount: number;
  count: number;
  members: string[];
  timerEnd: firestore.Timestamp | null;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};

export const initialRoom: Room = {
  name: '',
  timer: 15,
  breaks: 15,
  breaksCount: 5,
  count: 0,
  members: [],
  timerEnd: null,
  createdAt: null,
  updatedAt: null,
};
