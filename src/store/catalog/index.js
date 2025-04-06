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
      total: 0,
      limit: 10,
      skip: 0,
    };
  }

  async load(limit = this.getState().limit, skip = this.getState().skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        total: json.result.count || 0,
        limit,
        skip,
      },
      'Загружены товары из АПИ',
    );
  }
  setLimit(newLimit) {
    this.load(newLimit, 0);
  }

  setPage(page) {
    const { limit } = this.getState();
    const newSkip = (page - 1) * limit;
    this.load(limit, newSkip);
  }
}

export default Catalog;
