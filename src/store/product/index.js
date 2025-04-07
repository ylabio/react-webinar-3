import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      data: null,
    };
  }

  async load(productId) {
    if (!productId) {
      console.error('Не указан ID продукта');
      return;
    }

    this.setState({ ...this.getState(), loading: true, error: null }, 'Началась загрузка продукта');
    try {
      const response = await fetch(
        `/api/v1/articles/${productId}?fields=*,madeIn(title,code),category(title)`,
      );
      if (!response.ok) {
        throw new Error('Ошибка загрузки продукта');
      }

      const json = await response.json();

      this.setState(
        {
          ...this.getState(),
          data: json.result,
          loading: false,
        },
        'Продукт загружен',
      );
      this.store.actions.ui.setTitle(json.result.title);
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          error: error.message,
        },
        'Ошибка загрузки продукта',
      );
    }
  }
}

export default Product;
