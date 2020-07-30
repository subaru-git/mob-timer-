import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { TimerAppBar } from 'components/common/TimerAppBar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Logo from '../../asset/mobtimer-logo.svg';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'nowrap',
    },
    logo: {
      marginRight: '20px',
    },
    sharedLink: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      alignItems: 'center',
      height: '100vh',
    },
  }),
);

const TimerTop: FC = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const history = useHistory();

  return (
    <>
      <TimerAppBar menu={false} />
      <div className={classes.sharedLink}>
        <img className={classes.logo} src={Logo} alt="logo" />
        <div className={classes.sharedLink}>
          <Typography variant="h4">
            http://i-do-not-get-domain.sorry/
          </Typography>
          <TextField
            value={name}
            label="create shared link"
            helperText="your original room name"
            variant="filled"
            onChange={(e: any) => {
              setName(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              if (name !== '') history.push(`/${name}`);
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export { TimerTop };
