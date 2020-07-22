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
  main?: boolean;
}

const ScrumTimerCountdown: FC<ScrumTimerCountdownProp> = ({
  end,
  title,
  main,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.countdown}>
      <Countdown
        date={end}
        renderer={({ days, hours, minutes, seconds, completed }) => {
          if (completed) {
            return <span>Time is over!!</span>;
          }
          const text = `${days} days ${zeroPad(hours)} : ${zeroPad(
            minutes,
          )} : ${zeroPad(seconds)}`;
          const speed = text.length - 1;

          return (
            <div className={main ? classes.main : classes.sub}>
              <Wave text={text} speed={speed} />
            </div>
          );
        }}
      />
      <Typography
        variant={main ? 'h4' : 'h6'}
        align="right"
        color="textSecondary"
      >
        {title}
      </Typography>
    </div>
  );
};

export default ScrumTimerCountdown;
