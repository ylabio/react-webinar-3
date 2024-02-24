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
 * Возвращает окончание в соответствии с правилами множественного числа
 * @param {Map<string, string>} rule - Коллекция, правило для выбора суффикса, окончания или слова.
 * @param {number} count - Число, для которого нужно определить окончание.
 * @returns {string} Строка с правильным суффиксом, окончанием или целым словом.
 * @example 
 * const rule = new Map([
    ['one', 'о'],
    ['two', 'а'],
    ['other', ''],
  ]);
 * countSelections(rule, 1); // 'о'
 */
  export function getWordEnding(rule, count = 0) {
   
   const pluralRules = new Intl.PluralRules('ru').select(count);
   const wordEnding  = rule.get(pluralRules);
 
   return `${wordEnding}` ;
 }