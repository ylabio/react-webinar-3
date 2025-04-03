import StoreModule from '../module';

class LangStore extends StoreModule {
  initState() {
    return {
      currentLang: 'ru',
    };
  }

  setLang(lang) {
    this.setState({ currentLang: lang }, `Изменён язык на ${lang}`);
  }
}

export default LangStore;
