import firebase from 'firebase/app';
import { Room } from 'services/models/room';
import { collectionName } from 'services/constants';

const writeRoom = async (
  db: firebase.firestore.Firestore | null,
  room: Room,
) => {
  if (!db) return;

  const batch = db.batch();
  const doc = await db
    .collection(collectionName.rooms)
    .doc(room.id)
    .get();
  if (doc.exists) {
    batch.update(doc.ref, {
      ...room,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
};

const createRoom = async (db: firebase.firestore.Firestore, room: Room) => {
  await db
    .collection(collectionName.rooms)
    .doc(room.id)
    .set(room);
};

export { writeRoom, createRoom };
