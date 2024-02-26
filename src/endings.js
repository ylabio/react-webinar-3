export const ENDINGS = (NUMBER) => {
  const END1 = 'раз';
  const END2 = 'раза';
  const GETEND = (NUM, IND) => {
    const STR = NUM.toString();
    return +STR.slice(IND);
  };
  const TEENS = GETEND(NUMBER, -2);
  if (TEENS >= 10 && TEENS <= 20 ) {
    return `${NUMBER} ${END1}`;
  }
  const HASEND = (NUM) => {
    const HAS = [2, 3, 4];
    return HAS.some((ITM) => {
      return ITM === GETEND(NUM, -1);
    });
  };
  if (HASEND(NUMBER)) {
    return `${NUMBER} ${END2}`;
  } else {
    return `${NUMBER} ${END1}`;
  }
};
