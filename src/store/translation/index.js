
import StoreModule from "../module";

class Translation extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      lang: 'ru',
    }
  }

  switchLang() {
    this.setState({
        ...this.getState(),
        lang: this.getState().lang === 'ru' ? 'en' : 'ru',
      })} 
}

export default Translation;
