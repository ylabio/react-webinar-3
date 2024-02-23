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
 * Получение формы числительного в зависимости от числа
 * @param number {Number} Число
 * @param forms {...String} Формы числительного (2 или 3 формы)
 * @returns {String}
 */
export function getRightForm(number, ...forms) {
  if (forms.length === 0) return '';
  
  const decReminder = number % 100;
  const remainder = number % 10;

  if (![12,13,14].includes(decReminder) && remainder === 1) return forms[0];

  if (![12,13,14].includes(decReminder) && [2,3,4].includes(remainder)) return forms[1] ? forms[1] : forms[0];
  
  return forms[2] ? forms[2] : forms[0];
}
