const getSelectionPlural = count => {

  const lastTwoDigits = count % 100;
  const lastDigit = count % 10;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return `${count} раз`;
  }
  if (lastDigit === 1) {
    return `${count} раз`;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} раза`;
  }
  return `${count} раз`;
};

export default getSelectionPlural;
