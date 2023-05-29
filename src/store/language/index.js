import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'rus'
    }
  }
  
  /**
   * Выбор языка
   * @param {('rus'|'eng')} value
   */
  setLanguage(value) {
    this.setState({language: value}, `Выбран язык ${value}`);
  }
}

export default Language;
