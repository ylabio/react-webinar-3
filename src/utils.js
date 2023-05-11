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


function codeGenerator() {
  let value = 0;

  return () => {
    return value += 1;
  }
}

export const generator = codeGenerator();

/**
 * Склонение слов
 * @param num {Number} Количество
 * @param forms {[string, string, string]} Формы слов [один, несколько, много]
 * @returns {string}
 */
export function pluralize(num, forms) {
  const pr = new Intl.PluralRules("ru");
  const currentForm = new Map([['one', forms[0]], ['few', forms[1]], ['many', forms[2]]]);
  return currentForm.get(pr.select(num));
}
