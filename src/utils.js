const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

/**
 * Функция для склонения слова по положительному числу.
 * @param count {number} - Число, по которому определяется форма слова.
 * @param formOne {string} - Форма слова для чисел, оканчивающихся на 1 (кроме 11).
 * @param formFew {string} - Форма слова для чисел, оканчивающихся на 2-4 (кроме 12-14).
 * @param formMany {string} - Форма слова для всех остальных чисел включая 0.
 * @returns {string} - Результат склонения.
 */
export function pluralize({ count, formOne, formFew, formMany }) {

  const isValidCount = typeof count === 'number' && count >= 0;
  const areValidForms = [formOne, formFew, formMany].every(form => typeof form === 'string');

  if (!isValidCount || !areValidForms) {
    return '';
  }

  const lastTwoDigits = count % 100;
  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
    return formMany;
  }

  const lastDigit = count % 10;
  if (lastDigit === 1) {
    return formOne;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return formFew;
  }

  return formMany;
}
