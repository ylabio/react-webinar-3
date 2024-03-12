import StoreModule from "../module";

class Pagination extends StoreModule {

  initState() {
    return {
      currentPage: 1
    }
  }

  changePage(page) {
    this.setState({
      ...this.getState(),
      currentPage: page
    })
  }
}

export default Pagination;
