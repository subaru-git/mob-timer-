import React, { FC, useState } from 'react';
import TimerAppBar from 'containers/Home/TimerAppBar';
import TimerDrawer from 'containers/Home/TimerDrawer';
import TimerMain from 'containers/Home/TimerMain';

const App: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
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
    </>
  );
};

export default App;
