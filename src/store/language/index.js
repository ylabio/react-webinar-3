import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      language: 'ru'
    }
  }

  changeCurrentLanguage() {
    this.setState({
      ...this.getState(),
      language: this.getState().language === 'ru' ? 'en' : 'ru'
    }, 'Изменен текущий язык');
  }
}

export default Language;