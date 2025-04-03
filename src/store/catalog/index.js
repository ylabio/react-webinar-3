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
    };
  }

  async load(limit = this.getState().limit, skip = this.getState().skip) {
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}`);
    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        skip,
        limit,
      },
      'Загружены товары с учетом пагинации и лимита',
    );
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
