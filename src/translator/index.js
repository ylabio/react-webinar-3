import ru from './locales/ru.json';
import en from './locales/ru.json';

/**
 * Переводчик сайта
 */
class Translator {

  constructor() {
    this.data = {ru, en};
    this.locale = "ru";
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    }
  }

  _(word, locale = "ru") {
    if (this.data.hasOwnProperty(locale)) {
      if (this.data[locale].hasOwnProperty(word)) {
        return this.data[locale][word];
      }
    }
    return word;
  }

  getLocales() {
    return Object.keys(this.data);
  }

  getLocale() {
    return this.locale;
  }

  setLocale(locale) {
    if (this.data.hasOwnProperty(locale)) {
      this.locale = locale;
      // Вызываем всех слушателей
      for (const listener of this.listeners) listener(locale);
    }
  }
}

export default Translator;