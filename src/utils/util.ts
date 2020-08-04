import validUrl from 'valid-url';

const isNull = (t: any): t is null => t == null;

const shuffle = ([...arr]) => {
  let m = arr.length;
  const ret = arr;
  while (m) {
    const i = Math.floor(Math.random() * m);
    m -= 1;
    [ret[m], ret[i]] = [ret[i], ret[m]];
  }

  return ret;
};

const isValidRoomName = (domain: string, name: string) => {
  if (name.includes('/')) return false;

  return validUrl.isWebUri(`${domain}${name}`);
};

export { isNull, shuffle, isValidRoomName };
