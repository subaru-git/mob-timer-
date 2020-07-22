import { firestore } from 'firebase/app';

export type Product = {
  id?: string;
  name: string;
  timer: number;
  breaks: number;
  breaksCount: number;
  members: string[];
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
};
