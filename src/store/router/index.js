import StoreModule from "../module";

class RouterState extends StoreModule {

  initState() {
    return {
      url: null
    }
  }

  setUrl(url) {
    this.setState({url: url !== '/login' && url}, `Установлен послений url: ${url}`);
  }
}

export default RouterState;
