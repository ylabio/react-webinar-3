import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      currentItem: null,
    };
  }

  async load(id) {
    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`
      );
      const json = await response.json();

      this.setState(
        {
          currentItem: json.result,
        },
        `Загружен товар с ID ${id}`
      );
    } catch (error) {
      console.error(`Ошибка при загрузке товара с ID ${id}:`, error);
    }
  }
}

export default Product;
