import firebase from 'firebase/app';

import { Room, initialRoom } from 'services/models/room';
import { collectionName } from 'services/constants';
import { createRoom } from 'services/write-room';

const initializeRoom = (
  db: firebase.firestore.Firestore,
  name: string,
  setRoom: (room: Room) => void,
  setLoading: (loading: boolean) => void,
) => {
  if (!db) throw new Error('Firestore is not initialized');
  const query = db.collection(collectionName.rooms).doc(name);
  const load = async () => {
    setLoading(true);
    try {
      const snap = await query.get();
      if (!snap.exists) {
        const room = {
          ...initialRoom,
          id: name,
        };
        createRoom(db, room);
      }
      setRoom(snap.data() as Room);
      query.onSnapshot(snapshot => {
        setRoom(snapshot.data() as Room);
      });
    } catch (e) {
      console.log(`firebase error`);
    }
    setLoading(false);
  };
  load();
};

export default initializeRoom;
