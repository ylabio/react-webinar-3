import StoreModule from "../module";

class Language extends StoreModule {

  initState() {
    return {
      value: 'ru'
    }
  }

  changeLang(lang) {
    this.setState({
      ...this.getState(),
      value: lang
    })
  }
}

export default Language;
