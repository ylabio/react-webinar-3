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
  const key = new Intl.PluralRules(locale).select(value)
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || ''
}

export function pluralEn(value, variants = {}, locale = 'en-EN') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value)
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || ''
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value)
}

// const allLangs = ['ru', 'en']
// let currentLang = 'ru'
// const langButton = document.querySelectorAll('.header_btn')

const allPageLang = [
  {
    page: 'homePageLang',
    home_page_title: {
      ru: 'Магазин',
      en: 'Shop',
    },
    home_page_link: {
      ru: 'Главная',
      en: 'Home',
    },
    home_page_text: {
      ru: 'В корзине:',
      en: 'In the basket:',
    },
    home_page_quantity: {
      ru: 'пусто',
      en: 'empty',
    },
    home_page_button: {
      ru: 'Перейти',
      en: 'Go',
    },
    home_page_button_add: {
      ru: 'Добавить',
      en: 'Append',
    },
  },
  {
    page: 'productPageLang',
    product_page_title: {
      ru: 'Название товара',
      en: 'Product Name',
    },
    product_page_product: {
      ru: 'пусто',
      en: 'empty',
    },
    product_page_button_basket: {
      ru: 'Перейти',
      en: 'Go',
    },
    product_page_button_add: {
      ru: 'Добавить',
      en: 'Append',
    },
  },
  {
    page: 'basketPageLang',
    basket_page_title: {
      ru: 'Корзина',
      en: 'Basket',
    },
    basket_page_button_basket: {
      ru: 'Закрыть',
      en: 'Close',
    },
    basket_page_button_delete: {
      ru: 'Удалить',
      en: 'Delete',
    },
    basket_page_text: {
      ru: 'Итого',
      en: 'Total',
    },
  },
]

export function langGenerator(lang, page) {
  let foundPage = allPageLang.find((item) => item.page === page)
  let newLangPage = {}

  for (const key in foundPage) {
    if (foundPage.hasOwnProperty(key) && foundPage[key].hasOwnProperty('ru')) {
      newLangPage[key] = foundPage[key][lang]
    }
  }
  return newLangPage
}
