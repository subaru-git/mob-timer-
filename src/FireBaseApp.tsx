import React, { FC, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import writeProduct from 'services/write-product';
import { Product } from 'services/models/product';
import { FirebaseContext, ProductContext } from 'contexts';

const FirebaseApp: FC = ({ children }) => {
  const db = firebase.firestore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (product) {
      writeProduct(db, product);
    }
  });

  return (
    <FirebaseContext.Provider value={{ db }}>
      <ProductContext.Provider value={{ product, setProduct }}>
        {children}
      </ProductContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
