import plural from 'plural-ru';
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
 * @returns {string} возвращает уникальный id
 */
export const getUniqId = () => 'id_' + Math.floor(Math.random() * Date.now());
/**
 * для избежания хардкода в приложении
 * @param cnt {number} число для количественной формы слова
 * @returns {string} возвращает нужную форму слова "раз"
 */
export const pluralTimes = (cnt) => `${plural(cnt, 'раз', 'раза', 'раз')}`;
