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
      count: 0,
      limit: 10,
    };
  }

  async load() {
    const response = await fetch(
      `/api/v1/articles?limit=10&skip=0&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async pagination(limit = 10, skip = 0) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price)`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Пагинация',
    );
  }

  setLimit(limit) {
    this.setState({ ...this.getState(), limit }, 'Изменение лимита');
  }
}

export default Catalog;
