import StoreModule from '../module';

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentLanguage: 'ru', // Язык по умолчанию
    };
  }

  switchLanguage(lang) {
    this.setState(
      {
        ...this.getState(),
        currentLanguage: lang,
      },
      `Изменен язык на ${lang}`,
    );
  }
}

export default Language;
