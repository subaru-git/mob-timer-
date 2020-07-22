import React, { FC } from 'react';

import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import moment from 'moment';
import { Product } from 'services/models/product';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: '16px',
    },
    term: {
      width: '200px',
    },
    beginDate: {
      marginTop: '16px',
      marginBottom: '16px',
    },
  }),
);

const ProductSetting: FC<{
  product: Product;
  setProduct: (product: Product) => void;
}> = ({ product, setProduct }) => {
  const classes = useStyles();

  return (
    <div className={classes.title}>
      <Typography variant="subtitle2" gutterBottom>
        Product Setting
      </Typography>
      <div className={classes.beginDate}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="none"
            label="product begin date"
            value={moment(product.beginDate)}
            variant="inline"
            onChange={(date: Date | null) => {
              if (date) {
                setProduct({
                  ...product,
                  beginDate: moment(date)
                    .startOf('day')
                    .format(),
                });
              }
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <InputLabel shrink>sprint term</InputLabel>
      <Select
        className={classes.term}
        value={product.sprintTerm}
        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
          setProduct({
            ...product,
            sprintTerm: event.target.value as number,
          });
        }}
      >
        <MenuItem value={1}>1 week</MenuItem>
        <MenuItem value={2}>2 week</MenuItem>
        <MenuItem value={3}>3 week</MenuItem>
        <MenuItem value={4}>4 week</MenuItem>
      </Select>
    </div>
  );
};

export default ProductSetting;
