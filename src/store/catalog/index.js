import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      items: [],
      count: 0,
      params: {
        limit: 10,
        skip: 0,
      },
    };
  }

  async load(params = {}) {
    const state = this.getState();
    const newParams = {
      ...state.params,
      ...params,
    };

    const queryParams = new URLSearchParams({
      limit: newParams.limit,
      skip: newParams.skip,
      fields: 'items(_id,title,price),count',
    }).toString();

    try {
      const response = await fetch(`/api/v1/articles?${queryParams}`);
      const json = await response.json();

      this.setState(
        {
          ...state,
          items: json.result.items,
          count: json.result.count,
          params: newParams,
        },
        'Загружены товары из АПИ с пагинацией',
      );
    } catch (error) {
      console.error('Ошибка при загрузке товаров:', error);
    }
  }
}

export default Catalog;
