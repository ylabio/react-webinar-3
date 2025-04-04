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
      item: {},
    };
  }

  async load(limit = 10, page = 1) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${limit * (page - 1)}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
        item: {},
      },
      'Загружены товары из АПИ',
    );
  }

  async loadById(_id) {
    const response = await fetch(`/api/v1/articles/${_id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    const result = json.result;
    this.setState(
      {
        ...this.getState(),
        list: [result],
        item: result,
      },
      'Загружен один товар из АПИ',
    );
  }
}

export default Catalog;
