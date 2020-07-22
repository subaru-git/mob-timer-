import firebase from 'firebase/app';

import { createContext } from 'react';

import { Product } from 'services/models/product';

type FirebaseContextValue = {
  db: firebase.firestore.Firestore | null;
};

export const FirebaseContext = createContext<FirebaseContextValue>({
  db: null,
});

type ProductContextValue = {
  product: Product | null;
  setProduct: (product: Product) => void;
};

export const ProductContext = createContext<ProductContextValue>({
  product: null,
  setProduct: () => undefined,
});
