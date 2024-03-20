/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Форматирование категорий
 * @param source {Array}
 * @returns {Array}
 */
export const getCategories = (source) => {
	const options = [{
		"_id": null,
		"parent": '',
		"value": '',
		"title": "Все категории"
	}];
	source.forEach((elem) => {
		if (elem.parent === null) {
			options.push({
				"_id": elem._id,
				"parent": elem.parent,
				"value": elem._id,
				"title": elem.title
			});
		}
	});
	let nesting = 0;
	const handler = (current, parent) => {
		const child = source.filter((elem) => elem.parent?._id === current);
		(child.length && parent) ? nesting += 1 : nesting = 1;
		options.splice(
			options.findIndex((elem) => elem._id === current) + 1,
			0,
			...child.map((elem) => {
					return {
						"_id": elem._id,
						"parent": elem.parent,
						"value": elem._id,
						"title": `${('- ').repeat(nesting)}${elem.title}`
					}
				})
		);
	};
	for (const elem of options) {
		if (elem._id) {
			handler(elem._id, elem.parent);
		}
	};
	return options;
};
