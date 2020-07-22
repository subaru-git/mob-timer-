import { useContext, useEffect, useRef, useState } from 'react';

import { Product } from 'services/models/product';
import { collectionName } from 'services/constants';
import { FirebaseContext, ProductContext } from 'contexts';

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const productRef = useRef(useContext(ProductContext));

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');
    const query = db.collection(collectionName.products);
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
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { products, loading, error };
};

export default useProducts;
