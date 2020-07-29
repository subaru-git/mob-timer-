import 'date-fns';
import React, { FC, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DrawerHeader } from 'components/Drawer/DrawerHeader';
import { MobSetting } from 'containers/Home/MobSetting';
import { RoomContext } from 'contexts';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: '50%',
      minWidth: '350px',
      flexShrink: 0,
    },
    drawerPaper: {
      width: '50%',
      minWidth: '350px',
    },
    loading: {
      margin: 'auto',
    },
  }),
);

const TimerDrawer: FC<{
  handleDrawerClose: () => void;
  open: boolean;
}> = ({ handleDrawerClose, open }) => {
  const classes = useStyles();
  const { loading } = useContext(RoomContext);

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
        {loading ? (
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

export { TimerDrawer };
