import StoreModule from "../module";

class Lang extends StoreModule {

  initState() {
    return {
      lang: localStorage.getItem('locale') || 'ru'
    }
  }

  changeLang(lang) {
    this.setState({
      ...this.getState(),
      lang,
    }, 'Изменение языка')

    localStorage.setItem('locale', lang)
  }
}

export default Lang;