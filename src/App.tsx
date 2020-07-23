import React, { FC, useState } from 'react';
import ScrumTimerAppBar from 'containers/Home/ScrumTimerAppBar';
import ScrumTimerDrawer from 'containers/Home/ScrumTimerDrawer';
import ScrumTimerMain from 'containers/Home/ScrumTimerMain';

const App: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ScrumTimerAppBar
        handleDrawerOpen={() => {
          setOpen(true);
        }}
      />
      <ScrumTimerDrawer
        handleDrawerClose={() => {
          setOpen(false);
        }}
        open={open}
      />
      <ScrumTimerMain />
    </>
  );
};

export default App;
