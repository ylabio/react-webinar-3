import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class ItemInfo extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      item: {},
      loading: false,
      error: null,
    };
  }

  async loadItemById({ itemId }) {
    this.setState(
      { ...this.getState(), loading: true, error: null },
    );

    try {
      const response = await fetch(`/api/v1/articles/${itemId}?fields=*,madeIn(title,code),category(title)`);
      if (!response.ok) throw new Error(`Ошибка загрузки: ${response.status}`);

      const json = await response.json();

      this.setState(
        { ...this.getState(), item: json.result, loading: false },
        'Загружен товар по ID'
      );
    } catch (err) {
      this.setState(
        { ...this.getState(), error: err.message, loading: false },
        'Ошибка загрузки товара'
      );
    }
  }
}

export default ItemInfo;
