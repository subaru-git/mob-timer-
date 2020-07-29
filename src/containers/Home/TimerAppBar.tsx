/* eslint-disable @typescript-eslint/no-empty-function */
import React, { FC } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const ScrumTimerAppBar: FC<{
  handleDrawerOpen?: () => void;
  menu?: boolean;
}> = ({ handleDrawerOpen = () => {}, menu = true }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {menu ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <div />
          )}
          <Typography variant="h6" className={classes.title}>
            Mob Timer
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ScrumTimerAppBar;
