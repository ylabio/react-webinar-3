import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      skip: 0,
    }
  };

  onPageChange = (value) => {
    this.setState({
      ...this.getState(),
      currentPage: Number(value),
      skip: (value - 1) * this.getState().limit,
    });
  };

  onChangeLimit = (value) => {
    this.setState({
      ...this.getState(),
      limit: Number(value),
      currentPage: 1,
      skip: 0,
    });
  };
}

export default Pagination;
