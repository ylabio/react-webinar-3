import StoreModule from "../module";

class Lang extends StoreModule {

  initState() {
    return {
      lang: 'ru'
    }
  }

  toggleLang() {
    this.setState({
      ...this.getState(),
      lang: this.getState().lang === 'ru' ? 'en' : 'ru',
    }, 'Изменен текущий язык')
  }
}

export default Lang;