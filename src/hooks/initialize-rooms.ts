import firebase from 'firebase/app';

import { Room } from 'services/models/room';
import { collectionName } from 'services/constants';

const initializeRooms = (
  db: firebase.firestore.Firestore,
  setRoom: (room: Room) => void,
  setLoading: (loading: boolean) => void,
) => {
  if (!db) throw new Error('Firestore is not initialized');
  const query = db.collection(collectionName.rooms);
  const load = async () => {
    setLoading(true);
    try {
      const snap = await query.get();
      const data = snap.docs.map(doc => ({
        ...(doc.data() as Room),
        id: doc.id,
      }));
      setRoom(data[0]);
      query.onSnapshot(snapshot => {
        const updated = snapshot.docs.map(doc => ({
          ...(doc.data() as Room),
          id: doc.id,
        }));
        setRoom(updated[0]);
        console.log(`onSnapshot!!! ${snapshot.docChanges()[0]?.type}`);
      });
    } catch (e) {
      console.log(`firebase error`);
    }
    setLoading(false);
  };
  load();
};

export default initializeRooms;
