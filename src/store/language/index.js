import StoreModule from '../module';

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }
  initState() {
    return {
      currentLanguage: 'ru',
    };
  }

  setTranslation(lang) {
    console.log(this);
    this.setState({
      currentLanguage: lang,
    });
  }
}

export default Language;
