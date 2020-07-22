import React, { FC, useContext } from 'react';
import moment from 'moment';

import ScrumTimerCountdown from 'components/Home/ScrumTimerCountdown';
import ScrumTimerDailyStepper from 'components/Home/ScrumTimerDailyStepper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ProductContext } from 'contexts';
import { getSprintEndDate, toToday, getEvents } from 'utils/SprintCalculator';

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
  const { product } = useContext(ProductContext);

  return (
    <>
      {!true ? (
        <div className={classes.loadingMain}>
          <CircularProgress className={classes.loading} />
        </div>
      ) : (
        <>
          <div className={classes.appMain}>
            <div className={classes.mainTimer}>
              <ScrumTimerCountdown
                end={moment()
                  .add(10, 'm')
                  .toDate()}
                title="driver is XXX"
                main
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ScrumTimerMain;
