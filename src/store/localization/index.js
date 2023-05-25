import json from "../../localization/localization.json";
import StoreModule from "../module";

class Localization extends StoreModule {

  initState() {
    return {
      lang: "ru"
    };
  }

  /**
   * Задать язык интерфейса
   * @param lang {String} - ru, en, ch и т.п...
   */
  setLanguage(lang) {
    this.setState({
      lang
    }, 'Выбрана локализация "' + lang + '"');
  }

  /**
   * Возвращает локализованный текст
   * @param keyword {string} - ключ в jsone, по которому берем текст
   * @return {String}
   */
  localizeText(keyword) {
    const words = json.languages[this.getState().lang];
    if (!words)
      return '';
    return words[keyword];
  }
}

export default Localization;