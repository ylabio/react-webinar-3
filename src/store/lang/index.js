import StoreModule from '../module';

class Lang extends StoreModule {
  initState() {
    return {
      lang: 'ru-RU',
    };
  }

  /**
   * Изменение языка
   * @param lang Код языка
   */
  changeLang(lang) {
    this.setState({ lang }, 'Смена языка');
  }
}

export default Lang;
