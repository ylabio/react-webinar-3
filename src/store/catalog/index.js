import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      count: 0, // общее количество товаров
    };
  }

  /**
   * Загружает товары с учетом пагинации.
   * @param {Object} options - параметры загрузки
   * @param {number} [options.limit=10] - количество товаров на странице
   * @param {number} [options.skip=0] - смещение (количество пропущенных товаров)
   */
  async load({ limit = 10, skip = 0 } = {}) {
    
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      fields: 'items(_id,title,price),count',
    });

    const response = await fetch(`/api/v1/articles?${params.toString()}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из API с пагинацией',
    );
  }

  setOne(product) {
    if (!product || !product._id) {
      return;
    }
    const state = this.getState();
    const list = Array.isArray(state.list) ? state.list : [];
    const index = list.findIndex(item => item._id === product._id);
    let newList;

    if (index === -1) {
      newList = [...list, product];
    } else {
      newList = [
        ...list.slice(0, index),
        product,
        ...list.slice(index + 1),
      ];
    }
    this.setState(
      { ...state, list: newList },
      'Добавлен или обновлён товар в каталоге, чтобы корректно добавлять товары со страницы товара'
    );
  }
  
}

export default Catalog;
