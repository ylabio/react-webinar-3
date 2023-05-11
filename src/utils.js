export function declension(num) {
  let word = '';
  if (num % 10 === 2 || num % 10 === 3 || num % 10 === 4) {
    word = 'раза';
  } else {
    word = 'раз'
  }
  return word;
}
