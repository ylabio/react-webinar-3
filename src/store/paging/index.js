import StoreModule from "../module";

class Paging extends StoreModule {

  initState() {
    return {
      page: 1,
      limit: 10,
      skip: 0
    }
  }

    /**
   * Set limit per page
   * @param limit {Number}
   */
    setLimit(limit = 10) {
      this.setState({
        ...this.getState(),
        limit: limit
      }, `Установка лимита по ${limit}`);
    }

  /**
   * Change page by number
   * @param page {Number}
   */
  gotoPage(page) {
    const limit = this.getState().limit;
    const skip = (page - 1) * limit;

    this.setState({
      ...this.getState(),
      page: page,
      skip: skip
    }, `Переход на страницу ${page}`);
  }
}

export default Paging;
