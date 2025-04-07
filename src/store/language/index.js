import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      current: 'ru',
    };
  }
  changeLanguage(lang) {
    this.setState(
      {
        ...this.getState(),
        current: lang,
      },
      `Язык изменен на ${lang}`,
    );
  }
}

export default Language;
