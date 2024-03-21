import { Children } from "react";

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

export function makeCategoriesOptions(categoriesList, id, level) {
  const categories = []

  for (let category of categoriesList) {
    if (category.parent === null && !id) {
      const children = []
      children.push({value: category._id, title: category.title})
      children.push(...makeCategoriesOptions(categoriesList, category._id, 1))
      categories.push(...children)
    }
    if (category.parent && category.parent._id === id) {
      categories.push({value: category._id, title: ' - '.repeat(level) + category.title})
      categories.push(...makeCategoriesOptions(categoriesList, category._id, level + 1))
    }
  }
  
  return categories;
}

export function getCurrentToken() {
  return window.localStorage.getItem('token')
}

export function gatherErrorMessages(errObj) {
  const result = []
  if(errObj.message) result.push(errObj.message)
  
  if(errObj.data.issues) {
    for (let issue of errObj.data.issues) {
      result.push(issue.message)
    }
  }

  return result.join('. ');
}