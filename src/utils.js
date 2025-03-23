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
 * Сборка текста о количестве выделения задач
 * @returns {String}
 */
export function getCountText(item) {
  if (item.selected) {
    item.selectedCount ? (item.selectedCount += 1) : (item.selectedCount = 1);
    const { divider, text, countWord } = defineCountText(item);
    item.selectedCountText = ` ${divider} ${text} ${item.selectedCount} ${countWord}`;
    return item.selectedCountText;
  }
}

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param divider {String} Разделитель между текстом записи и колмчеством выделений
 * @param text {String} Текст для выделения записи
 * @param countWord {String} Счетное слово
 * @returns {Object}
 */
function defineCountText(item) {
  const divider = '|';
  const text = 'Выделяли';
  let countWord = '';

  if (
    item.selectedCount % 10 >= 2 &&
    item.selectedCount % 10 <= 4 &&
    item.selectedCount % 100 !== 12 &&
    item.selectedCount % 100 !== 13 &&
    item.selectedCount % 100 !== 14
  ) {
    countWord = 'раза';
  } else {
    countWord = 'раз';
  }

  return {
    divider: divider,
    text: text,
    countWord: countWord,
  };
}
