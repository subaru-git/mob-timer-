import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
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
  }),
);

const DaySetting: FC<{
  product: Product;
  setProduct: (product: Product) => void;
}> = ({ product, setProduct }) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.title}>
        <Typography variant="subtitle2">Day Setting</Typography>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            label="begin time"
            minutesStep={5}
            value={product.beginTime}
            onChange={(date: Date | null) => {
              if (date) {
                setProduct({
                  ...product,
                  beginTime: moment(date).format(),
                });
              }
            }}
          />
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            label="End Time"
            minutesStep={5}
            value={product.endTime}
            onChange={(date: Date | null) => {
              if (date) {
                setProduct({
                  ...product,
                  endTime: moment(date).format(),
                });
              }
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <div className={classes.dailyScrum}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardTimePicker
            margin="normal"
            label="daily scrum begin time"
            minutesStep={5}
            value={product.dailyScrumBeginTime}
            onChange={(date: Date | null) => {
              if (date) {
                setProduct({
                  ...product,
                  dailyScrumBeginTime: moment(date).format(),
                });
              }
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
    </>
  );
};

export default DaySetting;
