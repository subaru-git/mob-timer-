import React, { FC } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Wave } from 'react-animated-text';
import Countdown, { zeroPad } from 'react-countdown';
import { Typography } from '@material-ui/core';

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

interface ScrumTimerCountdownProp {
  end: Date;
  title: string;
  onFinish?: () => void;
}

const ScrumTimerCountdown: FC<ScrumTimerCountdownProp> = ({
  end,
  title,
  onFinish,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.countdown}>
      <Countdown
        date={end}
        renderer={({ minutes, seconds, completed }) => {
          if (completed) {
            return <span>Time is over!!</span>;
          }
          const text = `${zeroPad(minutes)} : ${zeroPad(seconds)}`;
          const speed = text.length;

          return (
            <div className={classes.main}>
              <Wave text={text} speed={speed} />
            </div>
          );
        }}
        onComplete={() => {
          if (onFinish) onFinish();
        }}
      />
      <Typography variant="h4" align="right" color="textSecondary">
        {title}
      </Typography>
    </div>
  );
};

export default ScrumTimerCountdown;
