import StoreModule from "../module";

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      list: [],
      count: 0,
      isLoading: false,
      limit: 10,
      currentPage: 1,
    }
  }

  /**
   * Обновление состояния текущей страницы
   * @param {Number} page 
   */
  setCurrentPage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }

  /**
   * Обновление состояния загрузчика
   * @param {Boolean} isLoading 
   */
  setIsLoading(isLoading) {
    this.setState({
      ...this.getState(),
      isLoading: isLoading = true,
    })
  }

  /**
   * Загрузка списка товаров
   * @param {Number} limit 
   * @param {Number} currentPage 
   */
  async load(limit, currentPage) {
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${(currentPage - 1) * limit}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      isLoading: false,
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
