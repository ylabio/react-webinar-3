import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'ru', // По умолчанию русский язык
    }
  }

  // Функция для изменения языка
  setLanguage(language) {
    this.setState({ ...this.getState(), language }, `Изменение языка на ${language}`);
  }
}

export default Language;
