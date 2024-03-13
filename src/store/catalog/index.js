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
    };
  }

  async load(limit = 10, page = 1, language = 'ru') {
    let skip = 0;

    if (page > 1) {
      skip = (page - 1) * limit;
    }
    const response = await fetch(
      `/api/v1/articles?lang=${language}&limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`,
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
}

export default Catalog;
