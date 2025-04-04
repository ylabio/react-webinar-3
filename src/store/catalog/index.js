import StoreModule from '../module';

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      selectedItem: null,
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

  // Метод для загрузки товара по ID
  async getItemById(id) {
    this.setState({ ...this.getState(), isLoading: true, error: null });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();

      if (response.ok) {
        this.setState({
          ...this.getState(),
          selectedItem: json.result,
          isLoading: false,
        });
        return json.result;
      } else {
        throw new Error(json.error.message);
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        isLoading: false,
        error: error.message,
      });
      return null;
    }
  }

  // Метод для сброса выбранного товара
  resetSelectedItem() {
    this.setState({
      ...this.getState(),
      selectedItem: null,
    });
  }
}

export default Catalog;
