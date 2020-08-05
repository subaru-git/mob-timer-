import React, { FC, useState } from 'react';
import firebase from 'firebase/app';
import { Helmet } from 'react-helmet';

import { CountdownTimer } from 'components/common/CountdownTimer';
import { TimerNotification } from 'components/Room/TimerNotification';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import StopIcon from '@material-ui/icons/Stop';
import RedoIcon from '@material-ui/icons/Redo';
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
  const [notification, setNotification] = useState(false);
  const maintimer = isNull(end) ? (
    <div className={classes.stop}>
      {isBreak ? (
        <>
          <LocalCafeIcon
            className={classes.driveIcon}
            style={{ fontSize: 40 }}
          />
          <Typography variant="h3" noWrap>
            break
          </Typography>
          <Helmet>
            <title>Mob Timer</title>
          </Helmet>
        </>
      ) : (
        <>
          <DriveEtaIcon
            className={classes.driveIcon}
            style={{ fontSize: 40 }}
          />
          <Typography variant="h3" noWrap>
            {driver}
          </Typography>
          <Helmet>
            <title>Mob Timer</title>
          </Helmet>
        </>
      )}
    </div>
  ) : (
    <>
      <CountdownTimer
        end={end.toDate()}
        onFinish={() => {
          onFinish();
          setNotification(true);
        }}
      />
      <div className={classes.playingDriver}>
        {isBreak ? (
          <>
            <LocalCafeIcon
              className={classes.driveIcon}
              style={{ fontSize: 25 }}
            />
            <Typography variant="h3" noWrap>
              break
            </Typography>
          </>
        ) : (
          <>
            <DriveEtaIcon
              className={classes.driveIcon}
              style={{ fontSize: 25 }}
            />
            <Typography variant="h3" noWrap>
              {driver}
            </Typography>
          </>
        )}
      </div>
    </>
  );

  return (
    <div className={classes.root}>
      <div className={classes.mainTimer}>{maintimer}</div>
      <div className={classes.buttons}>
        {isNull(end) ? (
          <Button
            className={classes.button}
            variant="outlined"
            color="primary"
            endIcon={<PlayCircleOutlineIcon />}
            onClick={() => {
              onStart();
            }}
          >
            Start
          </Button>
        ) : (
          <>
            <Button
              className={classes.button}
              variant="outlined"
              color="primary"
              endIcon={<StopIcon />}
              onClick={() => {
                onStop();
              }}
            >
              Stop
            </Button>
          </>
        )}
        <Button
          className={classes.button}
          variant="outlined"
          endIcon={<RedoIcon />}
          onClick={() => {
            onSkip();
          }}
        >
          Skip
        </Button>
      </div>
      <TimerNotification
        show={notification}
        onClose={() => {
          setNotification(false);
        }}
      />
    </div>
  );
};

export { TimerControl };
