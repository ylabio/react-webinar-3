import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      lang: 'ru'
    }
  }

   /**
   * Переключение языка
   */
  change() {
    if (this.getState().lang === 'ru') {
      this.setState({
        lang: 'eng'
      },'Переключение языка на английский')
    } else {
      this.setState({
        lang: 'ru'
      },'Переключение языка на русский')
    }
  }
}

export default Language;
