import StoreModule from "../module";

class Language extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      language: 'RU'
    }
  }

  setLanguage(language) {
    this.setState({
       ...this.getState(),
       language: language,
    }, 'Изменен язык');
  }
}

export default Language;
