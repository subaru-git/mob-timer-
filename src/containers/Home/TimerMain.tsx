import React, { FC, useContext } from 'react';
import moment from 'moment';
import firebase from 'firebase/app';

import CountdownTimer from 'components/Home/CountdownTimer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import writeProduct from 'services/write-product';
import { FirebaseContext, ProductContext } from 'contexts';

import { makeStyles, createStyles } from '@material-ui/core/styles';

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
  }),
);

const ScrumTimerMain: FC = () => {
  const classes = useStyles();
  const { db } = useContext(FirebaseContext);
  const { product } = useContext(ProductContext);
  if (!product) {
    return (
      <div className={classes.loadingMain}>
        <CircularProgress className={classes.loading} />
      </div>
    );
  }
  const isNull = (t: any): t is null => t == null;
  const driver = product.members[product.count % product.members.length];
  const maintimer = isNull(product.timerEnd) ? (
    <span>Please Start Next Timer : driver is {driver}</span>
  ) : (
    <CountdownTimer
      end={product.timerEnd.toDate()}
      title={`driver is ${driver}`}
      onFinish={() => {
        if (db) writeProduct(db, { ...product, count: product.count + 1 });
      }}
    />
  );
  const handleStart = () => {
    const timerEnd = firebase.firestore.Timestamp.fromDate(
      moment()
        .add(product.timer, 'm')
        .toDate(),
    );
    if (db) writeProduct(db, { ...product, timerEnd });
  };

  const handleStop = () => {
    if (db) writeProduct(db, { ...product, timerEnd: null });
  };

  return (
    <div className={classes.appMain}>
      <div className={classes.mainTimer}>{maintimer}</div>
      <Button
        variant="contained"
        onClick={() => {
          handleStart();
        }}
      >
        Start
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          handleStop();
        }}
      >
        Stop
      </Button>
    </div>
  );
};

export default ScrumTimerMain;
