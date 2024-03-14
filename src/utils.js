import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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


export function getPagination(activePage, totalPages) {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= activePage - delta && i <= activePage + delta)
    ) {
      range.push(i);
    }
  }

  let l;
  range.forEach((num) => {
    if (l) {
      if (num - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (num - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(num);
    l = num;
  });

  return rangeWithDots;
}

export function useFetchData() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(
      `/api/v1/articles/${id}?fields=category(title),price,edition,description,madeIn(title),edition`
    )
      .then((response) => response.json())
      .then((data) => setProduct(data.result));
  }, [id]);

  return { product, setProduct };
}
export function useFetchDataLang() {
  const { id } = useParams();
  const [language, setLanguage] = useState(null);

  useEffect(() => {
    fetch(
      `/api/v1/articles/${id}/language`
    )
      .then((response) => response.json())
      .then((data) => setLanguage(data.language));
  }, [id]);

  return { language, setLanguage };
}