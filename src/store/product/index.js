import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
  }

  initState() {
    return {
      product: null,
      loading: false,
      error: null,
    };
  }

  async loadProduct(id) {
    this.setState(
      {
        ...this.getState(),
        loading: true,
        error: null,
      },
      'Начинаем загрузку товара',
    );

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      if (!response.ok) {
        throw new Error('Ошибка при загрузке товара');
      }
      const data = await response.json();
      this.setState(
        {
          ...this.getState(),
          product: data.result,
          loading: false,
        },
        'Товар успешно загружен',
      );
    } catch (error) {
      this.setState(
        {
          ...this.getState(),
          loading: false,
          error: 'Ошибка при загрузке товара',
        },
        'Ошибка при загрузке товара',
      );
    }
  }
}

export default Product;
