import StoreModule from "../module";

class Application extends StoreModule {
  initState() {
    return {headTitle: '', lang: 'ru'};
  }


  setHeadTitle(val) {
    this.setState({
      ...this.getState(),
      headTitle: val
    })
  }

  changeLang() {
    this.setState({
      ...this.getState(),
      lang: this.getState().lang === 'en' ? 'ru' : 'en'
    })
  }
}

export default Application;
