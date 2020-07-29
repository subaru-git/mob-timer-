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

export { isNull, shuffle };
