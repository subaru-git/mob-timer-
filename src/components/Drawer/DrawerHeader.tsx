import React, { FC } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  }),
);

const DrawerHeader: FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.drawerHeader}>
      <IconButton onClick={handleClose}>
        <ChevronLeftIcon />
      </IconButton>
    </div>
  );
};

export { DrawerHeader };
