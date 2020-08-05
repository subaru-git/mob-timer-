import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Wave } from 'react-animated-text';
import Countdown, { zeroPad } from 'react-countdown';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles(() =>
  createStyles({
    countdown: {
      margin: '16px',
    },
    main: {
      fontSize: 'calc(40px + 2vmin)',
    },
    sub: {
      fontSize: 'calc(15px + 2vmin)',
    },
  }),
);

const CountdownTimer: FC<{
  end: Date;
  onFinish?: () => void;
}> = ({ end, onFinish }) => {
  const classes = useStyles();

  return (
    <div className={classes.countdown}>
      <Countdown
        date={end}
        renderer={({ minutes, seconds }) => {
          const text = `${zeroPad(minutes)} : ${zeroPad(seconds)}`;
          const speed = text.length;

          return (
            <div className={classes.main}>
              <Helmet>
                <title>{text}</title>
              </Helmet>
              <Wave text={text} speed={speed} />
            </div>
          );
        }}
        onComplete={() => {
          if (onFinish) onFinish();
        }}
      />
    </div>
  );
};

export { CountdownTimer };
