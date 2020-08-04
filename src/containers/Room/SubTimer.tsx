import React, { FC, useState, useContext } from 'react';
import Countdown, { zeroPad } from 'react-countdown';
import moment from 'moment';
import firebase from 'firebase/app';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import { FirebaseContext, RoomContext } from 'contexts';
import { writeRoom } from 'services/write-room';
import { isNull } from 'utils/util';
import { countSound } from 'utils/count-sound';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'left',
      alignItems: 'flex-end',
    },
    input: {
      alignSelf: 'center',
      marginLeft: '32px',
    },
    minLabel: {
      marginBottom: '10px',
    },
    countDown: {
      marginLeft: '32px',
      alignSelf: 'center',
    },
    loadingMain: {
      display: 'flex',
      height: '80vh',
    },
    loading: {
      margin: 'auto',
    },
  }),
);

const SubTimer: FC = () => {
  const classes = useStyles();
  const [time, setTime] = useState(5);
  const { db } = useContext(FirebaseContext);
  const { room } = useContext(RoomContext);

  const handleStart = () => {
    const subTimerEnd = firebase.firestore.Timestamp.fromDate(
      moment()
        .add(time, 'm')
        .add(1, 's')
        .toDate(),
    );
    writeRoom(db, { ...room, subTimerEnd });
    countSound(time, 0, true);
  };
  const handleStop = () => {
    writeRoom(db, { ...room, subTimerEnd: null });
  };

  const timer = isNull(room.subTimerEnd) ? (
    <div className={classes.root}>
      <TextField
        className={classes.input}
        value={time}
        type="number"
        onChange={(e: any) => {
          if (e.target.value > 0) {
            setTime(e.target.value);
          }
        }}
      />
      <Typography className={classes.minLabel} variant="caption">
        min
      </Typography>
      <IconButton
        onClick={() => {
          handleStart();
        }}
      >
        <PlayCircleOutlineIcon />
      </IconButton>
    </div>
  ) : (
    <div className={classes.root}>
      <Countdown
        date={room.subTimerEnd.toDate()}
        renderer={({ minutes, seconds }) => {
          const text = `${zeroPad(minutes)} : ${zeroPad(seconds)}`;
          countSound(minutes, seconds);

          return (
            <Typography className={classes.countDown} variant="h5">
              {text}
            </Typography>
          );
        }}
        onComplete={() => {
          handleStop();
        }}
      />
      <IconButton
        onClick={() => {
          handleStop();
        }}
      >
        <StopIcon />
      </IconButton>
    </div>
  );

  return <div>{timer}</div>;
};

export { SubTimer };
