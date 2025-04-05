import { codeGenerator, generatePagesArray } from '../../utils';
import { DEFAULT_QUERY } from '../../query/constants';

import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      itemsPerPage: 10,
      currentPage: 1,
      itemsCount: 0,
      pageItemsCountArray: [5, 10, 20],
    };
  }

  async load() {
    const { itemsPerPage, currentPage } = this.getState();

    await this.fetchData(itemsPerPage, currentPage);
  }

  async updateProductData(limit = 10, page = 1) {
    this.setState({
      ...this.getState(),
      currentPage: page,
      itemsPerPage: limit,
    });

    await this.fetchData(limit, page);
  }

  async fetchData(limit = 10, page = 1) {
    const skip = limit * (page - 1);

    const response = await fetch(
      `${DEFAULT_QUERY}?limit=${limit}&lang=ru&skip=${skip}&fields=items(_id,title,price),count`,
    );
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        allItemsCount: json.result.count,
      },
      'Обновлены товары из АПИ',
    );
  }
}

export default Catalog;
