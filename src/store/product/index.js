import StoreModule from '../module';

class ProductStore extends StoreModule {
  initState() {
    return {
      current: null,
    };
  }

  async load(id) {
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        current: json.result,
      },
      `Загружен товар с id: ${id}`,
    );
    this.store.actions.ui.setTitle(json.result.title);
  }

  clear() {
    this.setState(
      {
        ...this.getState(),
        current: null,
      },
      'Товар очищен',
    );
  }
}

export default ProductStore;
