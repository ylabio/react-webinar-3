import StoreModule from '../module';

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
      isLoading: false,
      error: null,
    };
  }

  async load(params = {}) {
    const { page = 1, limit = this.getState().pageSize } = params;
    const skip = (page - 1) * limit;

    this.setState({ ...this.getState(), isLoading: true });

    try {
      const response = await fetch(
        `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price,description),count`,
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        currentPage: page,
        pageSize: limit,
        isLoading: false,
      });

      return json.result.items;
    } catch (error) {
      this.setState({ ...this.getState(), isLoading: false, error: error.message });
      return [];
    }
  }
}

export default Catalog;
