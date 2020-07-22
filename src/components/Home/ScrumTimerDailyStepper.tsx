import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    stepper: {
      margin: '16px',
      width: '40%',
      height: '80vh',
    },
  }),
);

interface DailyEvent {
  date: moment.Moment;
  content: string;
}

const ScrumTimerDailyStepper: FC<{
  events: DailyEvent[];
  activeStep: number;
}> = ({ events, activeStep }) => {
  const classes = useStyles();

  return (
    <div className={classes.stepper}>
      <Timeline>
        {events.map((event, index) => (
          <TimelineEvent
            key={`${event.date.toString()}${event.content}`}
            title={event.date.format('H:mm')}
            icon={<AccessTimeIcon />}
            iconColor={index < activeStep ? '#757575' : '#6fba1c'}
            collapsible
            showContent
          >
            {event.content}
          </TimelineEvent>
        ))}
      </Timeline>
    </div>
  );
};

export default ScrumTimerDailyStepper;
