import StoreModule from '../module';

class Language extends StoreModule {

  initState() {
    return {
      type: 'ru'
    }
  }

  /**
   * Изменяет язык приложения (русский и английский)
   * @param language Тип языка
   */
  changeLanguage (language) {
   
    this.setState({
      ...this.getState(),
      type: language
    });

  }
}

export default Language;