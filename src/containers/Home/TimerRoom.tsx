import React, { FC, useState, useContext } from 'react';
import { TimerAppBar } from 'components/common/TimerAppBar';
import { TimerDrawer } from 'containers/Home/TimerDrawer';
import { TimerMain } from 'containers/Home/TimerMain';
import { RoomApp } from 'containers/Home/RoomApp';
import { RoomContext } from 'contexts';

const TimerRoom: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <RoomApp>
      <TimerAppBar
        handleDrawerOpen={() => {
          setOpen(true);
        }}
      />
      <TimerDrawer
        handleDrawerClose={() => {
          setOpen(false);
        }}
        open={open}
      />
      <TimerMain />
    </RoomApp>
  );
};

export { TimerRoom };
