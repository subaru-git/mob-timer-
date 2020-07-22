import 'date-fns';
import React, { FC, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import DrawerHeader from 'components/Drawer/DrawerHeader';
import MobSetting from 'components/Drawer/MobSetting';
import useProducts from 'hooks/use-products';
import { ProductContext } from 'contexts';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: '80%',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '80%',
    },
    loading: {
      margin: 'auto',
    },
  }),
);

const ScrumTimerDrawer: FC<{
  handleDrawerClose: () => void;
  open: boolean;
}> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const { loading } = useProducts();
  const { product, setProduct } = useContext(ProductContext);

  return (
    <div className={classes.root}>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{ paper: classes.drawerPaper }}
      >
        <DrawerHeader handleClose={handleDrawerClose} />
        <Divider />
        {loading || !product ? (
          <CircularProgress className={classes.loading} />
        ) : (
          <div>
            <MobSetting />
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ScrumTimerDrawer;
