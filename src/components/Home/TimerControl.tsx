import React, { FC } from 'react';
import firebase from 'firebase/app';

import { CountdownTimer } from 'components/common/CountdownTimer';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import { isNull } from 'utils/util';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 'auto',
    },
    stop: {
      display: 'flex',
      flexDirection: 'row',
    },
    playingDriver: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    driveIcon: {
      alignSelf: 'center',
      paddingRight: '20px',
    },
    mainTimer: {
      marginTop: '60px',
      width: '250px',
    },
    buttons: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
    },
    button: {
      margin: '10px',
    },
  }),
);

const TimerControl: FC<{
  end: firebase.firestore.Timestamp | null;
  driver: string;
  onFinish: () => void;
  onStart: () => void;
  onStop: () => void;
  onSkip: () => void;
  isBreak: boolean;
}> = ({ end, driver, onFinish, onStart, onStop, onSkip, isBreak }) => {
  const classes = useStyles();
  const maintimer = isNull(end) ? (
    <div className={classes.stop}>
      {isBreak ? (
        <>
          <LocalCafeIcon
            className={classes.driveIcon}
            style={{ fontSize: 40 }}
          />
          <Typography variant="h3">break</Typography>
        </>
      ) : (
        <>
          <DriveEtaIcon
            className={classes.driveIcon}
            style={{ fontSize: 40 }}
          />
          <Typography variant="h3">{driver}</Typography>
        </>
      )}
    </div>
  ) : (
    <>
      <CountdownTimer
        end={end.toDate()}
        onFinish={() => {
          onFinish();
        }}
      />
      <div className={classes.playingDriver}>
        {isBreak ? (
          <>
            <LocalCafeIcon
              className={classes.driveIcon}
              style={{ fontSize: 25 }}
            />
            <Typography variant="h3">break</Typography>
          </>
        ) : (
          <>
            <DriveEtaIcon
              className={classes.driveIcon}
              style={{ fontSize: 25 }}
            />
            <Typography variant="h3">{driver}</Typography>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className={classes.root}>
      <div className={classes.mainTimer}>{maintimer}</div>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            onStart();
          }}
        >
          Start
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            onStop();
          }}
        >
          Stop
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => {
            onSkip();
          }}
        >
          Skip
        </Button>
      </div>
    </div>
  );
};

export { TimerControl };
