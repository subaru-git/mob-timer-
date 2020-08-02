import React, { FC } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ClearIcon from '@material-ui/icons/Clear';
import CasinoIcon from '@material-ui/icons/Casino';
import { makeStyles, createStyles } from '@material-ui/core/styles';

import { shuffle } from 'utils/util';

const useStyles = makeStyles(() =>
  createStyles({
    addMembers: {
      marginTop: '16px',
    },
    membersLabel: {
      marginTop: '16px',
    },
    members: {
      display: 'flex',
      justifyContent: 'left',
      flexWrap: 'nowrap',
    },
    membersList: {
      flexBasis: '200px',
    },
  }),
);

const MembersSetting: FC<{
  members: string[];
  onKeyDown: (e: any) => void;
  onDelete: (index: number) => void;
  onDrop: (removedIndex: number, addedIndex: number) => void;
  onRandom: (newMembers: string[]) => void;
}> = ({ members = [], onKeyDown, onDelete, onDrop, onRandom }) => {
  const classes = useStyles();

  return (
    <div>
      <InputLabel shrink className={classes.addMembers}>
        Add Members
      </InputLabel>
      <TextField
        label="member"
        variant="filled"
        onKeyDown={(e: any) => {
          onKeyDown(e);
        }}
      />
      <InputLabel shrink className={classes.membersLabel}>
        Members
      </InputLabel>
      <div className={classes.members}>
        <List className={classes.membersList}>
          <Container
            dragHandleSelector=".drag-handle"
            lockAxis="y"
            onDrop={({ removedIndex, addedIndex }) => {
              if (removedIndex !== null && addedIndex !== null)
                onDrop(removedIndex, addedIndex);
            }}
          >
            {members.map((m, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <Draggable key={`${m}-${i}`}>
                <ListItem className="drag-handle">
                  <ListItemText primary={m} />
                  <ListItemSecondaryAction>
                    <IconButton
                      onClick={() => {
                        onDelete(i);
                      }}
                    >
                      <ClearIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            ))}
          </Container>
        </List>
        <div>
          <IconButton
            onClick={() => {
              onRandom(shuffle(members));
            }}
          >
            <CasinoIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export { MembersSetting };
