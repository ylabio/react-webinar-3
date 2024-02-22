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
 * Генерация уникального числа
 * @param min {Number} Минимальное значение
 * @param max {Number} Максимальное значение
 * @returns {Number}
 */

const uniqueNumbers = [];
export function generateUniqueRandomNumber(min, max) {
	let uniqueNumber;
	console.log(min);
	if (uniqueNumbers.length >= max - min + 1) {
		max = 1000;
	}
	do {
		uniqueNumber = Math.floor(Math.random() * (max - min + 1)) + min;
	} while (uniqueNumbers.includes(uniqueNumber));

	uniqueNumbers.push(uniqueNumber);
	return uniqueNumber;
}
