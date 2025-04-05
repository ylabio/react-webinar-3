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
      article: {},
      count: 0,
    };
  }

  async load({ current = 1, perPage = 10 }) {
    const response = await fetch(
      `/api/v1/articles?limit=${perPage}&skip=${(current - 1) * perPage}&fields=items(_key, _id, title, price),count`,
    );
    const json = await response.json();
    // console.log(json);

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
    console.log(this.getState());
  }

  async loadId(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=%2A&lang=ru`);
    const json = await response.json();
    console.log(json);

    this.setState(
      {
        ...this.getState(),
        article: json.result,
      },
      'Загружен товар по id',
    );
  }
}

export default Catalog;
