import StoreModule from '../module';

class Language extends StoreModule {
  initState() {
    return {
      language: 'ru',
    };
  }

  change(language) {
    this.setState({ language }, `Смена языка на ${language}`);
  }
}

export default Language;
