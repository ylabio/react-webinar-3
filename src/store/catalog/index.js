/* import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load() {
    const response = await fetch('/api/v1/articles');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
 */

import StoreModule from '../module';

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      count: 0,
      currentPage: 1,
      pageSize: 10,
    };
  }

  async load(params = {}) {
    const { page = this.getState().currentPage, limit = this.getState().pageSize } = params;
    const skip = (page - 1) * limit;

    const response = await fetch(
      `/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price,description),count`,
    );
    const json = await response.json();

    this.setState({
      ...this.getState(),
      list: json.result.items,
      count: json.result.count,
      currentPage: page,
      pageSize: limit,
    });
  }
}

export default Catalog;
