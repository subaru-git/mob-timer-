import React, { FC, useContext } from 'react';
import moment from 'moment';
import firebase from 'firebase/app';

import { TimerControl } from 'components/Home/TimerControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import { writeRoom } from 'services/write-room';
import { FirebaseContext, RoomContext } from 'contexts';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ListItemText } from '@material-ui/core';

const useStyles = makeStyles(() =>
  createStyles({
    appMain: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxHeight: '80vh',
    },
    mainTimer: {
      alignSelf: 'center',
      marginRight: '32px',
    },
    loadingMain: {
      display: 'flex',
      height: '80vh',
    },
    loading: {
      margin: 'auto',
    },
    list: {
      width: '100%',
      maxWidth: '360px',
    },
  }),
);

const TimerMain: FC = () => {
  const classes = useStyles();
  const { db } = useContext(FirebaseContext);
  const { room } = useContext(RoomContext);
  if (!room) {
    return (
      <div className={classes.loadingMain}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  }
  const driver = room.members[room.current];
  const isBreak = room.count === room.breaksCount;
  const handleFinish = () => {
    let newCurrent = room.current;
    let newCount = 0;
    if (!isBreak) {
      newCurrent = (room.current + 1) % room.members.length;
      newCount = room.count + 1;
    }
    writeRoom(db, {
      ...room,
      count: newCount,
      current: newCurrent,
      timerEnd: null,
    });
  };
  const handleStart = () => {
    let time = room.timer;
    if (isBreak) time = room.breaks;
    const timerEnd = firebase.firestore.Timestamp.fromDate(
      moment()
        .add(time, 'm')
        .toDate(),
    );
    writeRoom(db, { ...room, timerEnd });
  };

  const handleStop = () => {
    writeRoom(db, { ...room, timerEnd: null });
  };

  const handleSkip = () => {
    writeRoom(db, {
      ...room,
      timerEnd: null,
      current: (room.current + 1) % room.members.length,
    });
  };

  return (
    <>
      <LinearProgress
        variant="determinate"
        color="secondary"
        value={(room.count * 100) / room.breaksCount}
      />
      <div className={classes.appMain}>
        <TimerControl
          end={room.timerEnd}
          driver={driver}
          onFinish={handleFinish}
          onStart={handleStart}
          onStop={handleStop}
          onSkip={handleSkip}
          isBreak={isBreak}
        />
        <List className={classes.list} component="nav" aria-label="contacts">
          {room.members.map((m: string, i: number) => (
            <ListItem key={m}>
              {room.current === i && (
                <ListItemIcon>
                  <DriveEtaIcon />
                </ListItemIcon>
              )}
              <ListItemText inset={room.current !== i} primary={m} />
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
};

export { TimerMain };
