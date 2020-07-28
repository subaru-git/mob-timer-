import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import TimerAppBar from 'containers/Home/TimerAppBar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sharedLink: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '0 auto',
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
        <Typography variant="h4">http://i-do-not-get-domain.sorry/</Typography>
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
    </>
  );
};

export default TimerTop;
