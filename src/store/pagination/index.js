import StoreModule from '../module';

class Pagination extends StoreModule {
  initState() {
    return {
      items: [],
      currentPage: 1,
      totalCount: 0,
      perPage: 10
    };
  }

  async loadPage(page = 1) {
    const skip = (page - 1) * this.getState().perPage;
    const limit = this.getState().perPage;

    const response = await fetch(`/api/v1/articles?skip=${skip}&limit=${limit}&fields=items(_id,title,price),count`);
    const json = await response.json();

    this.setState({
      ...this.getState(),
      items: json.result.items,
      totalCount: json.result.count,
      currentPage: page
    }, `Загружена страница ${page}`);
  }
}

export default Pagination;
