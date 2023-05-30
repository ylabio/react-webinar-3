import StoreModule from "../module";

class Translation extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }
  initState() {
    return {
      currentLang: 'ru',
    }
  }

  setTranslation(lang) {
    this.setState({
      ...this.getState(),
      currentLang: lang
    }, `Смена языка интерфейса на ${lang}`);
  }

}

export default Translation;
