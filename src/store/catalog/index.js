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
      page: 1,
      count: 0,
      limit: 10,
    };
  }

  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        page: page,
      },
      'Выбрана страница пагинации'
    );
  }

  setLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit: limit,
      },
      'Выбрано число отображаемых на 1 странице товаров'
    );
  }

  async getCount() {
    const response = await fetch(`/api/v1/articles?fields=items(),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        count: json.result.count,
      },
      'Загружено количество товаров из АПИ',
    );
  }

  async load(page, limit) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${page*limit}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
