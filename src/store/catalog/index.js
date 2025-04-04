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
      totalPages: 0,
      limit: 10,
      currentPage: 1,
    };
  }

  async load(limit = 10, currentPage = 1) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${limit * (currentPage - 1)}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalPages: Math.ceil(json.result.count / limit),
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
