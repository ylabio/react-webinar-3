import StoreModule from "../module";

class Application extends StoreModule {
  initState() {
    return {headTitle: ''};
  }


  setHeadTitle(val) {
    this.setState({
      ...this.getState(),
      headTitle: val
    })
  }
}

export default Application;
