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
 * Возвращает вариант множественного числа
 * @param {Object} opts
 * @param {Intl.LocalesArgument} [opts.locale] - локаль
 * @param {Intl.PluralRuleType} [opts.type] - тип для множественного числа
 * @param {number} opts.number - число
 * @param {Map<keyof Intl.PluralRules, string>} opts.pluralForms - варианты множественного числа
 * @returns {string}
 */
export const getPluralForm = ({ locale, type, number, pluralForms }) => {
  const pr = new Intl.PluralRules(locale, { type });
  const rule = pr.select(number);
  const result = pluralForms.get(rule);

  return result;
};
