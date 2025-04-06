import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
      limit: 10,
      totalPages: 1,
      availableLimits: [5, 10, 20],
    };
  }

  onChangePage(number) {
    this.setState({...this.getState(), currentPage: number}, `Переход на страницу ${number}`);
  }

  onChangeLimit(newLimit) {
    this.setState({...this.getState(), limit: newLimit, currentPage: 1}, `Установлено новое количество записей на странице`);
    this.setTotalPages();
  }

  async setTotalPages() {
    const response = await fetch('/api/v1/articles?limit=*');
    const json = await response.json();
    this.setState({
      ...this.getState(),
      totalPages: Math.ceil(json.result.items.length / this.getState().limit),
    });
  }
}

export default Pagination;
