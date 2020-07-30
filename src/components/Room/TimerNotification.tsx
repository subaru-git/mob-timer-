import React, { FC } from 'react';
import Notification from 'react-web-notification';

const TimerNotification: FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const playSound = () => {
    const audio = new Audio('./sound.mp3');
    audio.play();
  };

  return (
    <div>
      {!show ? (
        <div />
      ) : (
        <>
          <Notification
            ignore={false}
            title="The time is up! change driver or take a break!"
            onShow={(e: object, tag: string) => {
              playSound();
            }}
            onClose={(e: object, tag: string) => {
              onClose();
            }}
          />
        </>
      )}
    </div>
  );
};

export { TimerNotification };
