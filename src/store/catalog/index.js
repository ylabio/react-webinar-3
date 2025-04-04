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
      skip: 1,
    };
  }

  async load(limit = this.getState().limit, skip = this.getState().skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${(skip - 1) * limit}`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result?.items || [],
        skip,
        limit,
      },
      'Загружены товары из АПИ',
    );
  }

  setSkip(skip) {
    this.setState(
      {
        ...this.getState(),
        skip: skip,
      },
    );
  }

  setLimit(limit) {
    this.setState(
      {
        ...this.getState(),
        limit: limit,
      },
    );
  }
}

export default Catalog;
