import React, { FC, useState, useEffect, useContext } from 'react';
import 'firebase/auth';
import 'firebase/firestore';

import { initialRoom } from 'services/models/room';
import initializeRoom from 'hooks/initialize-room';
import { FirebaseContext, RoomContext } from 'contexts';
import { useParams } from 'react-router-dom';

const RoomApp: FC = ({ children }) => {
  const { db } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState(initialRoom);
  const { name } = useParams();
  useEffect(() => {
    if (db) initializeRoom(db, name, setRoom, setLoading);
  }, []);

  return (
    <RoomContext.Provider value={{ room, setRoom, loading }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomApp;
