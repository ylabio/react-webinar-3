/**
 * Формирует строку с количеством выделений, выбирая правильную форму слова "раз"
 * @param count {number} Количество выделений
 * @returns {string} Строка с количеством выделений и правильной формой слова "раз"
 */
export function getSelectionText(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return ` | Выделяли ${count} раз`;
  } else if (lastDigit === 1) {
    return ` | Выделяли ${count} раз`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return ` | Выделяли ${count} раза`;
  } else {
    return ` | Выделяли ${count} раз`;
  }
}