import StoreModule from "../module";

class LocaleParamsState extends StoreModule {
  initState() {
    return {
      lang: "ru",
    };
  }

  /**
   * Установка кода языка (локали)
   * @param lang
   */
  setLocaleParams(lang, replaceHistory = false) {
    const localeParams = { ...this.getState(), lang };

    let urlSearch = new URLSearchParams(localeParams).toString();
    const url =
      window.location.pathname + "?" + urlSearch + window.location.hash;
    if (replaceHistory) {
      window.history.replaceState({}, "", url);
    } else {
      window.history.pushState({}, "", url);
    }

    this.setState(localeParams, "Установлена локаль");
  }

  initLocaleParams(lang) {
    const urlParams = new URLSearchParams(window.location.search);
    let validParams = {};
    if (urlParams.has("lang")) validParams.lang = urlParams.get("lang");
    this.setLocaleParams(lang, true);
  }
}

export default LocaleParamsState;
