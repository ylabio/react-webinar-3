import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      item: null,
      list: [],
      skip: 0,
      limit: 10,
      total: 0,
    };
  }

  async loadItem(id) {
    try {
      const response = await fetch(
        `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
      );
      const json = await response.json();

      this.setState({
        ...this.getState(),
        item: json.result,
      });
    } catch (error) {
      console.error('Ошибка при загрузке товара:', error);
    }
  }

  async load(limit = this.getState().limit, skip = this.getState().skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        total: json.result.count,
        skip,
        limit,
      },
      'Загружены товары из АПИ',
    );
  }

  setPage(page) {
    const limit = this.getState().limit;
    const skip = (page - 1) * limit;
    this.load(limit, skip);
  }

  setLimitAndLoad(limit, page = 1) {
    const skip = (page - 1) * limit;

    this.setState(
      {
        ...this.getState(),
        limit,
        skip,
      },
      'Лимит и скип установлены',
    );

    this.load(limit, skip);
  }
}

export default Catalog;
