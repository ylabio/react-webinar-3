import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
      limitItem: 10,
    };
  }

  changePage(number) {
    this.setState({ ...this.getState(), currentPage: number });
  }

  changeLimitItem(number) {
    this.setState({ ...this.getState(), limitItem: number });
  }
}

export default Pagination;
