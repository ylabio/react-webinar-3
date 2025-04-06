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
      skip: 0,
      limit: 10,
      total: 0,
    };
  }

  async load(limit = this.getState().limit, skip = this.getState().skip) {
    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        skip,
        limit,
        total: json.result.count,
      },
      'Загружены товары с учетом пагинации и лимита',
    );
  }

  addItem(item) {
    const list = this.getState().list;
    if (!list.some(i => i._id === item._id)) {
      this.setState(
        {
          ...this.getState(),
          list: [...list, item],
        },
        'Добавлен единичный товар в каталог',
      );
    }
  }

  setLimit(limit) {
    void this.load(limit, 0);
  }

  setPage(page) {
    const limit = this.getState().limit;
    const skip = (page - 1) * limit;
    void this.load(limit, skip);
  }
}

export default Catalog;
