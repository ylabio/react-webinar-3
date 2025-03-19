export function plurals(count) {
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'раз';
  }

  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return 'раз';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'раза';
  } else {
    return 'раз';
  }
}
