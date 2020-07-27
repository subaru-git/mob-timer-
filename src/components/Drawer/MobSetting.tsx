import React, { FC, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import TimerSlider from 'components/common/TimerSlider';
import { RoomContext, FirebaseContext } from 'contexts';
import writeRoom from 'services/write-room';

import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      margin: '16px',
    },
    slider: {
      marginTop: '16px',
      width: '300px',
    },
  }),
);

const MobSetting: FC = () => {
  const classes = useStyles();
  const { db } = useContext(FirebaseContext);
  const { room } = useContext(RoomContext);
  const members = room ? room.members : [];
  const timer = room ? room.timer : 15;
  const breaks = room ? room.breaks : 15;
  const breaksCount = room ? room.breaksCount : 5;
  const handleTimerChange = (value: number) => {
    if (room) {
      if (db) writeRoom(db, { ...room, timer: value });
    }
  };
  const handleBreaksChange = (value: number) => {
    if (room) {
      if (db) writeRoom(db, { ...room, breaks: value });
    }
  };
  const handleBreaksCountChange = (e: any) => {
    if (room) {
      if (db) writeRoom(db, { ...room, breaksCount: e.target.value });
    }
  };
  const handleDelete = (i: number) => {
    members.splice(i, 1);
    if (room) {
      if (db) writeRoom(db, { ...room, members });
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const nm = e.target.value;
      members.push(nm);
      if (room) {
        if (db) writeRoom(db, { ...room, members });
      }
      e.target.value = '';
    }
  };

  return (
    <div className={classes.title}>
      <Typography variant="subtitle2">Mobbing Setting</Typography>
      <div className={classes.slider}>
        <InputLabel shrink>Timer</InputLabel>
        <TimerSlider
          value={timer}
          step={5}
          min={5}
          max={60}
          onSliderChange={(event: any, newValue: number | number[]) => {
            if (typeof newValue === 'number') {
              handleTimerChange(newValue);
            }
          }}
        />
        <InputLabel shrink>Breaks</InputLabel>
        <TimerSlider
          value={breaks}
          step={5}
          min={5}
          max={60}
          onSliderChange={(event: any, newValue: number | number[]) => {
            if (typeof newValue === 'number') {
              handleBreaksChange(newValue);
            }
          }}
        />
        <InputLabel shrink>Breaks Count</InputLabel>
        <TextField
          value={breaksCount}
          type="number"
          onChange={(e: object) => {
            handleBreaksCountChange(e);
          }}
        />
        <InputLabel shrink>Add Members</InputLabel>
        <TextField
          label="member"
          onKeyDown={e => {
            handleKeyDown(e);
          }}
        />
        <InputLabel shrink>Members</InputLabel>
        {members.map((m, i) => (
          <Chip
            key={m}
            label={m}
            onDelete={() => {
              handleDelete(i);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MobSetting;
