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
 * Возвращает строку с правильным окончанием для фразы "Выделяли N раз".
 * @param {number} count - Число выделений.
 * @returns {string} Строка с правильным окончанием.
 */
export function countSelections(count = 0) {
  const suffixes = new Map([
    ['one', ' '],
    ['two', 'а'],
    ['few', 'а'],
    ['many', ' '],
    ['other', ' '],
  ]);

  const pluralRules = new Intl.PluralRules('ru');
  const rule = pluralRules.select(count);
  const suffix = suffixes.get(rule);

  return `Выделяли ${count} раз${suffix}`;
}
