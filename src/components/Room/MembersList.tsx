import React, { FC } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DriveEtaIcon from '@material-ui/icons/DriveEta';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: '360px',
      marginTop: '20px',
    },
  }),
);

const MembersList: FC<{ members: string[]; current: number }> = ({
  members,
  current,
}) => {
  const classes = useStyles();

  return (
    <List className={classes.list} component="nav" aria-label="contacts">
      {members.map((m: string, i: number) => (
        // eslint-disable-next-line react/no-array-index-key
        <ListItem key={`${m}-${i}`}>
          {current === i && (
            <ListItemIcon>
              <DriveEtaIcon />
            </ListItemIcon>
          )}
          <ListItemText inset={current !== i} primary={m} />
        </ListItem>
      ))}
    </List>
  );
};

export { MembersList };
