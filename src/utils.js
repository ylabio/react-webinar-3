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

// Функция изменяющая окончание слов в зависимости от падежа
export function transformWords(num, words) {  
	let n = num % 10;
    
	if (num > 10 && num < 20) return `${num} ${words[2]}`;
	if (n > 1 && n < 5) return `${num} ${words[1]}`;
	if (n === 1) return `${num} ${words[0]}`;
    
	return `${num} ${words[2]}`;
}
