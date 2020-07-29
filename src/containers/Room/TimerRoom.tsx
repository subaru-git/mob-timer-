import React, { FC, useState } from 'react';
import { TimerAppBar } from 'components/common/TimerAppBar';
import { TimerDrawer } from 'containers/Room/TimerDrawer';
import { TimerMain } from 'containers/Room/TimerMain';
import { RoomApp } from 'containers/Room/RoomApp';

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
