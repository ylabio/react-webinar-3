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
	let n = Math.abs(num);
  
  n %= 100;
  if (n >= 5 && n <= 20) return `${num} ${words[2]}`;

  n %= 10;
  if (n === 1) return `${num} ${words[0]}`;
  if (n >= 2 && n <= 4) return `${num} ${words[1]}`
    
	return `${num} ${words[2]}`;
}

// Генерация уникального id
export function genUniqueId(arr) {
  let id = Math.floor(Math.random() * (arr.length + 5));

  while (arr.includes(id)) {
    id = Math.floor(Math.random() * (arr.length + 5));
  }

  arr.push(id);
  return id;
}
