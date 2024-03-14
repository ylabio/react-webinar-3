import StoreModule from "../module";

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    const localLang = JSON.parse(window.localStorage.getItem("lang"));
    return {
      language: localLang || "ru",
    };
  }

  setLanguage(lang) {
    this.setState({
      language: lang,
    });
    window.localStorage.setItem("lang", JSON.stringify(lang));
  }
}

export default Language;
