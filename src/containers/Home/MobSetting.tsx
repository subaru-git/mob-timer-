import React, { FC, useContext } from 'react';
import ArrayMove from 'array-move';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

import TimerSlider from 'components/common/TimerSlider';
import MembersSetting from 'components/Drawer/MembersSetting';
import { RoomContext, FirebaseContext } from 'contexts';
import { writeRoom } from 'services/write-room';

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
    addMembers: {
      marginTop: '16px',
    },
    membersLabel: {
      marginTop: '16px',
    },
    members: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
);

const MobSetting: FC = () => {
  const classes = useStyles();
  const { db } = useContext(FirebaseContext);
  const { room, setRoom } = useContext(RoomContext);
  const members = room ? room.members : [];
  const timer = room ? room.timer : 15;
  const breaks = room ? room.breaks : 15;
  const breaksCount = room ? room.breaksCount : 5;
  const handleTimerChange = (value: number) => {
    writeRoom(db, { ...room, timer: value });
  };
  const handleBreaksChange = (value: number) => {
    writeRoom(db, { ...room, breaks: value });
  };
  const handleBreaksCountChange = (e: any) => {
    writeRoom(db, { ...room, breaksCount: e.target.value });
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const nm = e.target.value;
      members.push(nm);
      writeRoom(db, { ...room, members });
      e.target.value = '';
    }
  };
  const handleDelete = (i: number) => {
    members.splice(i, 1);
    writeRoom(db, { ...room, members });
  };
  const handleDrop = (removedIndex: number, addedIndex: number) => {
    const newMembers = ArrayMove(members, removedIndex, addedIndex);
    writeRoom(db, { ...room, members: newMembers });
    // if you wait "onSnapshot", List is blinked.
    setRoom({ ...room, members: newMembers });
  };
  const handleRandom = (newMembers: string[]) => {
    writeRoom(db, { ...room, members: newMembers });
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
        <MembersSetting
          members={members}
          onKeyDown={handleKeyDown}
          onDelete={handleDelete}
          onDrop={handleDrop}
          onRandom={handleRandom}
        />
      </div>
    </div>
  );
};

export default MobSetting;
