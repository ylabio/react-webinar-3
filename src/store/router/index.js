import StoreModule from "../module";

class RouterState extends StoreModule {

  initState() {
    return {
      url: null
    }
  }

  setUrl(url) {
    console.log(url)
    this.setState({url: url !== '/login' && url}, `Установлен послений url: ${url}`);
  }
}

export default RouterState;
