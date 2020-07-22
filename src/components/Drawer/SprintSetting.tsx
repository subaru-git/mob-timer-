import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

import ScrumTimerSlider from 'components/common/ScrumTimerSlider';
import { Product } from 'services/models/product';

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

const SprintSetting: FC<{
  product: Product;
  setProduct: (product: Product) => void;
}> = ({ product, setProduct }) => {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      <Typography variant="subtitle2">Sprint Setting</Typography>
      <div className={classes.slider}>
        <InputLabel shrink>sprint review time</InputLabel>
        <ScrumTimerSlider
          value={product.sprintReviewTime}
          step={15}
          min={15}
          max={120}
          onSliderChange={(event: any, newValue: number | number[]) => {
            setProduct({
              ...product,
              sprintReviewTime: newValue as number,
            });
          }}
        />
        <InputLabel shrink>sprint retrospective time</InputLabel>
        <ScrumTimerSlider
          value={product.sprintRetrospectiveTime}
          step={15}
          min={15}
          max={120}
          onSliderChange={(event: any, newValue: number | number[]) => {
            setProduct({
              ...product,
              sprintRetrospectiveTime: newValue as number,
            });
          }}
        />
        <InputLabel shrink>sprint planning part 1 time</InputLabel>
        <ScrumTimerSlider
          value={product.sprintPlanning1Time}
          step={15}
          min={15}
          max={120}
          onSliderChange={(event: any, newValue: number | number[]) => {
            setProduct({
              ...product,
              sprintPlanning1Time: newValue as number,
            });
          }}
        />
        <InputLabel shrink>sprint planning part 2 time</InputLabel>
        <ScrumTimerSlider
          value={product.sprintPlanning2Time}
          step={15}
          min={15}
          max={120}
          onSliderChange={(event: any, newValue: number | number[]) => {
            setProduct({
              ...product,
              sprintPlanning2Time: newValue as number,
            });
          }}
        />
      </div>
    </div>
  );
};

export default SprintSetting;
