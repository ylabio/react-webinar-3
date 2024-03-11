import StoreModule from "../module";

class Lang extends StoreModule {

  initState() {
    return {
      lang: 'ru'
    }
  }

  changeLang(lang) {
    this.setState({
      ...this.getState(),
      lang,
    }, 'Изменение языка')
  }
}

export default Lang;