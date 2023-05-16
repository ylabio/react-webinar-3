const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param id {number} id тега
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

export const generateRandomString = () => {
	return Math.random().toString(36).substring(2, 15);
}

export function sklonenie(number, txt) {
	var cases = [2, 0, 1, 1, 1, 2];
	return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}
export function uniq(number, list) {
	const numbersOfItem = list.map((itemList) => {
		return itemList.code;
	});
	while (numbersOfItem.includes(number)) {
		++number
	}
	return number;
}