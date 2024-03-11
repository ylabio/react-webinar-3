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


export const langArr = {
  "shop":{
    "ru":'Магазин',
    "en":"Shop"
  },
  "main":{
    "ru":'Главная',
    "en":"Home"
  },
  "delete":{
    "ru":'Удалить',
    "en":"Delete"
  },
  "add":{
    "ru":"Добавить",
    "en":"Add"
  },
  "cart":{
    "ru":'Корзина',
    "en":"Cart"
  },
  "BasketTools":{
    "ru": 'В корзине:',
    "en": 'In cart:'
  },
  "empty":{
    "ru": 'пусто',
    "en": 'empty'
  },
  "goodsOne":{
    "ru": "товар",
    "en": "product"
  },
  "goodsFew":{
    "ru": "товара",
    "en": "products"
  },
  "goodsMany":{
    "ru": "товаров",
    "en": "products"
  },
  "main":{
    "ru":'Главная',
    "en":'Home'
  },
  "pcs":{
    "ru": "шт",
    "en": "pcs",
  },
  "go":{
    "ru":"Перейти",
    "en":"Go"
  },
  "close":{
    "ru":'Закрыть',
    "en":"Close"
  },
  "remove":{
    "ru":"Удалитъ",
    "en":"Remove"
  },
  "total":{
    "ru":"Итого",
    "en":"Total"
  }

}