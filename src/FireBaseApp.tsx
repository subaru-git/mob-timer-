import React, { FC, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import writeProduct from 'services/write-product';
import { Product, initialProduct } from 'services/models/product';
import initializeRooms from 'hooks/initialize-rooms';
import { FirebaseContext, ProductContext } from 'contexts';

const FirebaseApp: FC = ({ children }) => {
  const db = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(initialProduct);
  useEffect(() => {
    initializeRooms(db, setProduct, setLoading);
  }, []);

  return (
    <FirebaseContext.Provider value={{ db }}>
      <ProductContext.Provider value={{ product, setProduct, loading }}>
        {children}
      </ProductContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
