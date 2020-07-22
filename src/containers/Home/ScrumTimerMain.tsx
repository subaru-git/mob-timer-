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
    subTimers: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
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
  const begin = toToday(moment(product?.beginTime));
  const daily = toToday(moment(product?.dailyScrumBeginTime));
  const end = toToday(moment(product?.endTime));
  const send = getSprintEndDate(
    moment(product?.beginDate).toDate(),
    product ? product.sprintTerm : 1,
    moment().toDate(),
    moment(product?.beginTime).toDate(),
    moment(product?.endTime).toDate(),
  );
  const events = getEvents(begin, end, daily, moment());
  const findIndex = events.findIndex(e => e.date > moment());
  const activeStep = findIndex === -1 ? events.length : findIndex;

  return (
    <>
      {!product ? (
        <div className={classes.loadingMain}>
          <CircularProgress className={classes.loading} />
        </div>
      ) : (
        <>
          <div className={classes.appMain}>
            <ScrumTimerDailyStepper events={events} activeStep={activeStep} />
            <div className={classes.mainTimer}>
              <ScrumTimerCountdown
                end={end.toDate()}
                title="end working"
                main
              />
            </div>
          </div>
          <div className={classes.subTimers}>
            <ScrumTimerCountdown end={send} title="sprint end" />
          </div>
        </>
      )}
    </>
  );
};

export default ScrumTimerMain;
