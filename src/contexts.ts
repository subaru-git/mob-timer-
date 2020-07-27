import firebase from 'firebase/app';
import { createContext } from 'react';

import { Room } from 'services/models/room';

export const FirebaseContext = createContext<{
  db: firebase.firestore.Firestore | null;
}>({
  db: null,
});

export const RoomContext = createContext<{
  room: Room | null;
  setRoom: (room: Room) => void;
  loading: boolean;
}>({
  room: null,
  setRoom: () => undefined,
  loading: false,
});
