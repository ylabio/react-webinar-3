import StoreModule from "../module";

class Language extends StoreModule {
  initState() {
    return {
      currentLanguage: localStorage.getItem('currentLanguage') || 'ru',
    };
  }

  setLanguage(newLanguage) {
    this.setState({ currentLanguage: newLanguage });
    localStorage.setItem('currentLanguage', newLanguage)
  }

  toggleLanguage() {
    const newLanguage = this.getState().currentLanguage === 'ru' ? 'en' : 'ru';
    this.setLanguage(newLanguage)
  }

}

export default Language;
