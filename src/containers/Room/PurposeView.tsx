import React, { FC, useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Wave } from 'react-animated-text';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      paddingTop: '50px',
      fontSize: '3.5rem',
      flexDirection: 'column',
    },
    mainTopics: {
      flex: '0 0 80px',
    },
    input: {
      width: '500px',
      margin: '0 0 0 auto',
      paddingRight: '20px',
    },
  }),
);

const PurposeView: FC<{
  topics: string;
  onKeyDown: (e: any) => void;
}> = ({ topics = '', onKeyDown }) => {
  const classes = useStyles();
  const [label, setLabel] = useState('input main topics');
  const [helperText, setHelperText] = useState('');
  const [inputError, setInputError] = useState(false);

  return (
    <div className={classes.root}>
      <div className={classes.mainTopics}>
        <Wave
          text={topics}
          effect="stretch"
          effectChange={1.2}
          speed={5}
          delay={3}
        />
      </div>
      <div className={classes.input}>
        <TextField
          label={label}
          helperText={helperText}
          variant="outlined"
          onKeyDown={(e: any) => {
            if (!inputError) onKeyDown(e);
          }}
          onChange={(e: any) => {
            if (e.target.value.length > 49) {
              setInputError(true);
              setLabel('too long!!!');
              setHelperText(
                'If the main topic is long, the goal may be too large.',
              );

              return;
            }
            setInputError(false);
            setLabel('input main topics');
            setHelperText('');
          }}
          error={inputError}
          fullWidth
        />
      </div>
    </div>
  );
};

export { PurposeView };
