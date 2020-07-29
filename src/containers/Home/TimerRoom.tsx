import React, { FC, useState } from 'react';
import TimerAppBar from 'containers/Home/TimerAppBar';
import TimerDrawer from 'containers/Home/TimerDrawer';
import TimerMain from 'containers/Home/TimerMain';
import RoomApp from 'containers/Home/RoomApp';

const TimerRoom: FC = () => {
  const [open, setOpen] = useState<boolean>(true);

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

export default TimerRoom;
