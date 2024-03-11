import StoreModule from "../module";

class Pagination extends StoreModule {

  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      currentPage: null,
      lastPage: null
    }
  }

  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    }, 'Изменена текущая страница')
  }

  getLastPage(count) {
    let page;
    switch (count) {
      case (count <= 10):
        page = 1;
        break;
      case (count % 10 === 0):
        page = count / 10;
        break;
      default:
        page = Math.floor(count / 10) + 1;
        break;
    }
    return page;
  }

  async load() {
    const response = await fetch('api/v1/articles?fields=items(), count');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      currentPage: 1,
      lastPage: this.getLastPage(json.result.count)
    }, 'Загружено количество страниц из АПИ')
  }
}

export default Pagination;
