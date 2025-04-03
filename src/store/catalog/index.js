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
    };
  }

  async load(skip = this.getState().skip) {
    const limit = 10;
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        skip,
      },
      'Загружены товары с учетом пагинации',
    );
  }

  setLimit(limit) {
    void this.load(limit, 0);
  }

  setPage(page) {
    const limit = 10;
    const skip = (page - 1) * limit;
    void this.load(skip);
  }
}

export default Catalog;
