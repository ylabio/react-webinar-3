import StoreModule from "../module";
import dictionary from './dictionary';

class Translator extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    const locale = "locale" in localStorage && ["ru", "en"].indexOf(localStorage.locale) ? localStorage.locale : "ru";
    return {
      locales: ["ru", "en"],
      locale,
      dictionary: dictionary[locale],
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

    localStorage.setItem('locale', locale);
  }
}

export default Translator;
