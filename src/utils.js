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
export function numberFormat(value, locale = 'ru-RU', options) {
  if(value % 1) options = {minimumFractionDigits: 2};
  return new Intl.NumberFormat(locale, options).format(value);
}

export function getTextData(query) {
  const textDataset = {

    ru: {
      mainHead: {
        title: 'Магазин',
        optionRu: 'Русский',
        optionEn: 'English',
      },
      productHead: {
        optionRu: 'Русский',
        optionEn: 'English',
      },
      mainNav: {
        main: 'Главная',
      },
      catalogProduct: {
        button: 'Добавить',
      },
      basketTool: {
        inBasket: 'В корзине:',
        empty: 'пусто',
        button: 'Перейти',
      },
      basketProduct: {
        button: 'Удалить',
        unit: 'шт',
      },
      basketTotal: {
        total: 'Итого',
      },
      modalBasket: {
        title: 'Корзина',
        button: 'Закрыть',
      },
      productFull: {
        madeIn: 'Страна производитель:',
        category: 'Категория:',
        yearProduction: 'Год выпуска:',
        price: 'Цена:',
        button: 'Добавить',

      },
      pluralProduct: {
        one: 'товар',
        few: 'товара',
        many: 'товаров',
      },
    },

    en: {
      mainHead: {
        title: 'Store',
        optionRu: 'Русский',
        optionEn: 'English',
      },
      productHead: {
        optionRu: 'Русский',
        optionEn: 'English',
      },
      mainNav: {
        main: 'Main',
      },
      catalogProduct: {
        button: 'Add',
      },
      basketTool: {
        inBasket: 'In basket:',
        empty: 'empty',
        button: 'Go',
      },
      basketProduct: {
        button: 'Remove',
        unit: 'pcs',
      },
      basketTotal: {
        total: 'Total',
      },
      modalBasket: {
        title: 'Basket',
        button: 'Close',
      },
      productFull: {
        madeIn: 'Made in:',
        category: 'Category:',
        yearProduction: 'Year of production:',
        price: 'Price:',
        button: 'Add',

      },
      pluralProduct: {
        one: 'product',
        few: 'products',
        many: 'products',
      },
    },
  }

  return textDataset[query];
}
