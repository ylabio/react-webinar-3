/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = "ru-RU") {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || "";
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
export function numberFormat(value, locale = "ru-RU", options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getCategoriesUtils(res) {
  let result = [{ value: "", title: "Все" }];

  if (res.result) {
    res.result.items.map((item) => {
      if (!item.parent) {
        result[result.length] = {
          value: item._id,
          title: item.title,
        };
      } else {
        const index = result.findIndex((el) => el.value === item.parent._id);

        if (index !== -1 && !result[index].title.startsWith("-")) {
          result = [
            ...result.slice(0, index + 1),
            {
              value: item._id,
              title: `- ${item.title}`,
            },
            ...result.slice(index + 1),
          ];
        } else if (
          index !== -1 &&
          result[index].title.startsWith("-") &&
          !result[index].title.startsWith("- -")
        ) {
          result = [
            ...result.slice(0, index + 1),
            {
              value: item._id,
              title: `- - ${item.title}`,
            },
            ...result.slice(index + 1),
          ];
        } else if (index !== -1 && result[index].title.startsWith("- -")) {
          result = [
            ...result.slice(0, index + 1),
            {
              value: item._id,
              title: `- - - ${item.title}`,
            },
            ...result.slice(index + 1),
          ];
        }
      }
    });
  }

  return result;
}
