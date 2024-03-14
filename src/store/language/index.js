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

    localStorage.setItem('language', language);
   
    this.setState({
      ...this.getState(),
      type: language
    });

  }

  /**
   * Проверяет и устанавливает сохраненый язык пользователя в приложении
   */
  checkLangUser () {
    // localStorage.removeItem('language');
    const langLocal = localStorage.getItem('language');
    if (langLocal) {
      this.changeLanguage(langLocal);
    }
  }

}

export default Language;