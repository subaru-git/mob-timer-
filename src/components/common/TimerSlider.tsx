import React, { FC } from 'react';

import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

const ScrumTimerSlider: FC<{
  value: number;
  step: number;
  min: number;
  max: number;
  onSliderChange: (event: unknown, newValue: number | number[]) => void;
}> = ({ value, step, min, max, onSliderChange }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Slider
          value={value}
          aria-labelledby="input-slider"
          valueLabelDisplay="auto"
          step={step}
          marks
          min={min}
          max={max}
          onChange={onSliderChange}
        />
      </Grid>
      <Grid item>
        <Input
          value={value}
          margin="dense"
          inputProps={{
            step,
            min,
            max,
            type: 'number',
            'aria-labelledby': 'input-slider',
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item>
        <Typography variant="caption">min</Typography>
      </Grid>
    </Grid>
  );
};

export default ScrumTimerSlider;
