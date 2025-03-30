export function plural(count) {
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return 'товаров';
  }

  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return 'товар';
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return 'товара';
  } else {
    return 'товаров';
  }
}
