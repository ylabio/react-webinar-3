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
      totalPages: 1,
    };
  }

  async load() {
    const { limit, page } = this.getState();
    const skip = (page - 1) * limit;

    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, _key, title, price),count`);
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

  async setLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit,
      },
      'Установлен лимит',
    );
    await this.load();
  }

  async setPage(page) {
    this.setState(
      {
        ...this.getState(),
        page,
      },
      'Установлена страница',
    );
    await this.load();
  }
}

export default Catalog;
