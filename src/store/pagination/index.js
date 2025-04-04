import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      limit: 10,
      page: 1,
    };
  }

  onPageChange(value) {
    this.setState({ ...this.getState(), page: value });
  }

  onLimitChange(value) {
    this.setState({ ...this.getState(), limit: value });
  }
}

export default Pagination;
