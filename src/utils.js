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

export function getNounForm(number, one, two, five) {
	let num = Math.abs(number);
	num %= 100;
	if (num >= 5 && num <= 20) {
		return five;
	}
	num %= 10;
	if (num === 1) {
		return one;
	}
	if (num >= 2 && num <= 4) {
		return two;
	}
	return five;
}
