import StoreModule from "../module";
import dictionary from './dictionary';

class Translator extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      locales: ["ru", "en"],
      locale: "ru",
      dictionary: dictionary["ru"],
    }
  }

  /**
   * Перевод текста
   * @param text Текст для перевода
   */
  translate(text) {
    return text in this.getState().dictionary ? this.getState().dictionary[text] : text;
  }

  /**
   * Меняем локаль
   * @param page Обозначение локали
   */
  setLocale(locale) {
    if (this.getState().locales.indexOf(locale) < 0 || this.getState().locale === locale) {
      return;
    }

    this.setState({
      ...this.getState(),
      locale,
      dictionary: dictionary[locale]
    }, 'Смена локали: ' + locale);
  }
}

export default Translator;
