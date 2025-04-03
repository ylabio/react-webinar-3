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
      limit: 10,
      page: 1,
    };
  }

  async load() {
    const { limit, page } = this.getState();
    const skip = (page - 1) * limit;

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  setLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit,
      },
      'Лимит товаров на странице изменён',
    );

    this.load();
  }

  setPage(page) {
    this.setState(
      {
        ...this.getState(),
        page,
      },
      'Страница изменена',
    );

    this.load();
  }
}

export default Catalog;
