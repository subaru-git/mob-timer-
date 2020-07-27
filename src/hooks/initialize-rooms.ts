import firebase from 'firebase/app';

import { Product } from 'services/models/product';
import { collectionName } from 'services/constants';

const initializeRooms = (
  db: firebase.firestore.Firestore,
  setProduct: (product: Product) => void,
  setLoading: (loading: boolean) => void,
) => {
  if (!db) throw new Error('Firestore is not initialized');
  const query = db.collection(collectionName.rooms);
  const load = async () => {
    setLoading(true);
    try {
      const snap = await query.get();
      const data = snap.docs.map(doc => ({
        ...(doc.data() as Product),
        id: doc.id,
      }));
      setProduct(data[0]);
      query.onSnapshot(snapshot => {
        const updated = snapshot.docs.map(doc => ({
          ...(doc.data() as Product),
          id: doc.id,
        }));
        setProduct(updated[0]);
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
