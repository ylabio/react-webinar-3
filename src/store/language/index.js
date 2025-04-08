import StoreModule from '../module';

class Language extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      lang: 'ru',
    };
  };

  /**
   * Изменение языка
   * @param lang Код языка
   */
  switch(lang) {
    this.setState({
      ...this.getState(),
      lang: lang,
    }, 'Смена языка');
  };
}

export default Language;
