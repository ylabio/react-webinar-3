/**
 * Возвращает правильное окончание для заданного числа.
 * @param value {Number} Число
 * @param variants {Object} Варианты окончания
 * @param locale {String} Язык
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
	// Получаем форму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
	// В русском языке 3 формы: 'one', 'few', 'many'
	// 1 товар = one
	// 2-4 товара = few
	// 5 и больше товаров = many
	// 9.98 товара = other

	const key = new Intl.PluralRules(locale).select(value);
	console.log(key);
	// Возвращаем вариант по ключу, если он есть\
	return variants[key] || '';
}

export const generateCode = (function (start = 0) {
	return () => {
		return ++start;
	};
})();

export const generateCode1 = (function (start = 0) {
	function* realGenerator(start) {
		while (true) {
			yield ++start;
		}
	}
	const gen = realGenerator(start);
	return () => gen.next().value;
})();
