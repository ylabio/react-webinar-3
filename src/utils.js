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
 * Генерация URL для пагинированного API запроса
 * @param baseUrl {String} - Базовый URL API
 * @param currentPage {Number} - Текущая страница (начинается с 1)
 * @param limit {Number} - Количество элементов на странице
 * @returns {String} - Сформированный URL с параметрами limit, skip и fields
 */
export function generatePaginatedApiUrl(baseUrl, currentPage, limit) {
  return `${baseUrl}?limit=${limit}&skip=${(currentPage - 1) * limit}&fields=items(_id, title, price),count`;
}

/**
 * Генерация массива номеров страниц для пагинации с учетом текущей позиции
 * @param currentPage {Number} - Текущая страница
 * @param count {Number} - Общее количество элементов
 * @param limit {Number} - Количество элементов на странице
 * @returns {Array} - Массив номеров страниц и нулей (для разделителей ...)
 *                    Пример: [1, 2, 3, 0, 10] → 1 2 3 ... 10
 */
// ?TODO: HACK: Временная/неоптимальная реализация
export function generatePaginationArray(currentPage, count, limit) {
  const maxPade = Math.ceil(count / limit);
  const id = +currentPage;

  let arrStrart = [];
  let arrMiddle = [];
  let arrEnd = [];

  switch (true) {
    case id <= 2:
      arrStrart = [1, 2, 3];
      arrEnd = [0, maxPade];
      break;
    case id === 3:
      arrStrart = [1, 2, 3, 4];
      arrEnd = [0, maxPade];
      break;
    case id >= maxPade - 1:
      arrStrart = [1, 0];
      arrEnd = [maxPade - 2, maxPade - 1, maxPade];
      break;
    case id === maxPade - 2:
      arrStrart = [1, 0];
      arrEnd = [maxPade - 4, maxPade - 2, maxPade - 1, maxPade];
      break;
    default:
      arrStrart = [1, 0];
      arrMiddle = [id - 1, id, id + 1];
      arrEnd = [0, maxPade];
  }

  return [...arrStrart, ...arrMiddle, ...arrEnd];
}

/**
 * Расчет новой страницы при изменении количества элементов на странице
 * @param oldPageNumber {Number} - Номер текущей страницы
 * @param oldLimit {Number} - Текущее количество элементов на странице
 * @param newLimit {Number} - Новое количество элементов на странице
 * @returns {Number} - Номер новой страницы, содержащей первый элемент текущей страницы
 *                     Пример: Было: страница 3 по 5 элементов (элементы 11-15)
 *                             Стало: страница 2 по 10 элементов (элементы 11-20)
 */
export function findNewPageNumber(oldPageNumber, oldLimit, newLimit) {
  const firstNumberInOldPage = (+oldPageNumber - 1) * +oldLimit + 1;
  const newPageNumber = Math.ceil(+firstNumberInOldPage / +newLimit);
  return newPageNumber;
}