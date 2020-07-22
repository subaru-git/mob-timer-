import firebase from 'firebase/app';
import { Product } from 'services/models/product';
import { collectionName } from 'services/constants';

const writeProduct = async (
  db: firebase.firestore.Firestore,
  product: Product,
) => {
  console.log(product);
  const batch = db.batch();
  const doc = await db
    .collection(collectionName.rooms)
    .doc(product.id)
    .get();
  if (doc.exists) {
    batch.update(doc.ref, {
      ...product,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  await batch.commit();
};

export default writeProduct;
