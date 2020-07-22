import React, { FC, useContext } from 'react';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

import ScrumTimerSlider from 'components/common/ScrumTimerSlider';
import { ProductContext } from 'contexts';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: '16px',
    },
    dailyScrum: {
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
  const { product, setProduct } = useContext(ProductContext);
  const members = product ? product.members : [];
  const timer = product ? product.timer : 15;
  const breaks = product ? product.breaks : 15;
  const breaksCount = product ? product.breaksCount : 5;
  const handleTimerChange = (value: number) => {
    if (product) {
      setProduct({ ...product, timer: value });
    }
  };
  const handleBreaksChange = (value: number) => {
    if (product) {
      setProduct({ ...product, breaks: value });
    }
  };
  const handleBreaksCountChange = (e: any) => {
    if (product) {
      setProduct({ ...product, breaksCount: e.target.value });
    }
  };
  const handleDelete = (i: number) => {
    console.log(`${members[i]} chip is deleted`);
    members.splice(i, 1);
    if (product) {
      setProduct({ ...product, members });
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      const nm = e.target.value;
      console.log(nm);
      members.push(nm);
      if (product) {
        setProduct({ ...product, members });
      }
      e.target.value = '';
    }
  };

  return (
    <div className={classes.title}>
      <Typography variant="subtitle2">Mobbing Setting</Typography>
      <div className={classes.slider}>
        <InputLabel shrink>Timer</InputLabel>
        <ScrumTimerSlider
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
        <ScrumTimerSlider
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
          defaultValue={breaksCount}
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
