/* eslint-disable no-restricted-syntax */
const playSound = async (path: string) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(path);
    audio.addEventListener('ended', () => {
      resolve();
    });
    audio.playbackRate = 1.5;
    audio.play();
  });
};

const soundsTable = [
  ['./count-sound/shuuryou.mp3'], // end
  ['./count-sound/ato.mp3', './count-sound/juu-.mp3', './count-sound/byou.mp3'], // 10 sec
  [
    './count-sound/ato.mp3',
    './count-sound/san.mp3',
    './count-sound/juu-.mp3',
    './count-sound/byou.mp3',
  ], // 30 sec
  ['./count-sound/ato.mp3', './count-sound/ichi.mp3', './count-sound/fun.mp3'], // 1 min
];

const getSounds = (min: number, sec: number) => {
  if (min === 1 && sec === 0) {
    return soundsTable[3];
  }
  if (min === 0 && sec === 30) {
    return soundsTable[2];
  }
  if (min === 0 && sec === 10) {
    return soundsTable[1];
  }
  if (min === 0 && sec === 0) {
    return soundsTable[0];
  }

  return null;
};

export const countSound = async (min: number, sec: number, start = false) => {
  if (start) {
    playSound('./count-sound/start.mp3');

    return;
  }
  const sounds = getSounds(min, sec);
  if (sounds === null) return;

  for await (const sound of sounds) {
    await playSound(sound);
  }
};
