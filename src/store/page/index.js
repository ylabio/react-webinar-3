import StoreModule from "../module";

class Page extends StoreModule {

  initState() {
    return {
      limit: 10,
      skip: 0,
      count: 10
    }
  }

  changePage(page){
    this.setState({
      ...this.getState(), 
      skip: (page - 1) * 10
    }, `Переключение страницы списка ${page}`);
  }
}

export default Page;
