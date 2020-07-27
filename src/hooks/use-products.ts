import { useContext, useEffect, useRef, useState } from 'react';
import firebase from 'firebase/app';

import { Product } from 'services/models/product';
import { collectionName } from 'services/constants';
import { FirebaseContext, ProductContext } from 'contexts';

const useProducts = (db: firebase.firestore.Firestore) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const productRef = useRef(useContext(ProductContext));

  useEffect(() => {
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
        setProducts(data);
        productRef.current.setProduct(data[0]);
        setError(null);
        query.onSnapshot(snapshot => {
          const updated = snapshot.docs.map(doc => ({
            ...(doc.data() as Product),
            id: doc.id,
          }));
          setProducts(updated);
          productRef.current.setProduct(updated[0]);
          console.log(`onSnapshot!!! ${snapshot.docChanges()[0]?.type}`);
        });
        console.log(`firebase done`);
        console.log(data);
      } catch (e) {
        setError(e);
        console.log(`firebase error`);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { products, setProducts, loading, error };
};

export default useProducts;
