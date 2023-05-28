import StoreModule from "../module";
import locales from "../../locales";

class Language extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      activeLanguage: 'ru'
    }
  }

  changeLanguage(lang) {
    this.setState({
      ...this.getState(),
      activeLanguage: lang,
    })
  }
}

export default Language;
