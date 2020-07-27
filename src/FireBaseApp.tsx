import React, { FC, useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { initialRoom } from 'services/models/room';
import initializeRooms from 'hooks/initialize-rooms';
import { FirebaseContext, RoomContext } from 'contexts';

const FirebaseApp: FC = ({ children }) => {
  const db = firebase.firestore();
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(initialRoom);
  useEffect(() => {
    initializeRooms(db, setRoom, setLoading);
  }, []);

  return (
    <FirebaseContext.Provider value={{ db }}>
      <RoomContext.Provider value={{ room, setRoom, loading }}>
        {children}
      </RoomContext.Provider>
    </FirebaseContext.Provider>
  );
};

export default FirebaseApp;
