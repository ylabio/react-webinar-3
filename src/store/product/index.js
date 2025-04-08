import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      data: null, // Данные текущего товара
      isLoading: false,
      error: null,
      related: [], // Похожие товары (опционально)
    };
  }

  /**
   * Загрузка данных товара по ID
   * @param {string} id - ID товара
   */
  async loadProduct(id) {
    this.setState({
      ...this.getState(),
      isLoading: true,
      error: null,
    });

    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();

      if (response.ok) {
        this.setState({
          ...this.getState(),
          data: json.result,
          isLoading: false,
        });
      } else {
        throw new Error(json.error?.message || 'Ошибка загрузки товара');
      }
    } catch (error) {
      this.setState({
        ...this.getState(),
        isLoading: false,
        error: error.message,
      });
    }
  }

  /**
   * Сброс данных товара
   */
  reset() {
    this.setState(this.initState());
  }
}

export default Product;
