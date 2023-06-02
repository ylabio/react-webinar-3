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

export function filterCategory(data) {
  const childMap = data.reduce((map, child) => {
    return {
      ...map,
      [child._id]: {
        ...child,
      },
    };
  }, {});

  let arr = [
    {
      _id: '6477698510d1060c910cbb59',
      title: 'Электроника',
      dash: '',
      parent: null,
    },
    {
      _id: '6477698510d1060c910cbb5a',
      title: 'Телефоны',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb59',
      },
    },
    {
      _id: '6477698510d1060c910cbb61',
      title: 'Смартфоны',
      dash: '- -',
      parent: {
        _id: '6477698510d1060c910cbb5a',
      },
    },
    {
      _id: '6477698510d1060c910cbb62',
      title: 'Аксессуары',
      dash: '- -',
      parent: {
        _id: '6477698510d1060c910cbb5a',
      },
    },
    {
      _id: '6477698510d1060c910cbb5b',
      title: 'Ноутбуки',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb59',
      },
    },
    {
      _id: '6477698510d1060c910cbb5c',
      title: 'Телевизоры',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb59',
      },
    },
    {
      _id: '6477698510d1060c910cbb5d',
      title: 'Книги',
      dash: '',
      parent: null,
    },
    {
      _id: '6477698510d1060c910cbb5e',
      title: 'Учебники',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb5d',
      },
    },
    {
      _id: '6477698510d1060c910cbb5f',
      title: 'Художественная',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb5d',
      },
    },
    {
      _id: '6477698510d1060c910cbb60',
      title: 'Комиксы',
      dash: '-',
      parent: {
        _id: '6477698510d1060c910cbb5d',
      },
    },
  ];
  return arr;
}
