import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      page: 0,
      totalAmount: 0
    }
  }

  setPage(page) {
    this.setState({
      ...this.getState(),
      page: page,
    }, 'Изменена текущая страница')
  }

  async loadTotalAmount() {
    const response = await fetch('/api/v1/articles?limit=*&fields=items(_id)');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalAmount: json.result.items.length
    }, 'Загружено общее количество товаров из АПИ');
  }
}

export default Pagination;
